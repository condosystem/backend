/* eslint-disable prettier/prettier */
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tokens } from 'src/types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtAtSecret, jwtRtSecret } from './constants';
import { AuthRepository } from 'src/repositories/AuthRepository';


@Injectable()
export class AuthService implements AuthRepository {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService

    ) { }

    async signup({ email, password, accountTypeId, employeeId }: AuthDto): Promise<Tokens> {

        const accountType = await this.prisma.accountType.findUnique({
            where: {
                id: accountTypeId,
            }
        });

        if (!accountType) throw new NotFoundException('Account Type not found.');

        const employee = await this.prisma.employee.findUnique({
            where: {
                personId: employeeId,
            }
        });

        if (!employee) throw new NotFoundException('Employee not found.');

        const emailAlreadyExists = await this.prisma.account.findUnique({
            where: { email }
        });

        if (emailAlreadyExists) throw new ConflictException('Email already exists');

        const hash = await this.hasData(password);

        const account = await this.prisma.account.create({
            data: {
                email,
                hash,
                accountTypeId,
                employeeId
            }
        });

        const tokens = await this.getTokens(account.id, account.email);
        await this.updateRtHash(account.id, tokens.refresh_token);

        return tokens;
    }

    async findAll() {

        const accounts = await this.prisma.account.findMany();

        return accounts;
    }

    async findByEmail(email: string) {

        const account = await this.prisma.account.findUnique({
            where: { email }
        });

        if (!account) throw new NotFoundException('Account not found.');

        return account;
    }

    async findOne(id: string) {

        const account = await this.prisma.account.findUnique({
            where: { id }
        });

        if (!account) throw new NotFoundException('Account not found.');

        return account;
    }

    async signin({ email, password }): Promise<Tokens> {

        const account = await this.prisma.account.findUnique({
            where: {
                email,
                status: true
            }
        });

        if (!account) throw new ForbiddenException('Access Denied');

        const passwordHash = await bcrypt.compare(password, account.hash);

        if (!passwordHash) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(account.id, account.email);
        await this.updateRtHash(account.id, tokens.refresh_token);

        return tokens;
    }

    async logout(id: string) {

        await this.prisma.account.updateMany({
            where: {
                id,
                hashedRt: {
                    not: null
                }
            },
            data: { hashedRt: null }
        })
    }

    async refresh(id: string, refreshToken: string) {

        const account = await this.prisma.account.findUnique({
            where: { id }
        });

        if (!account || !account.hashedRt) throw new ForbiddenException('Access Denied');

        const rtHash = bcrypt.compare(refreshToken, account.hashedRt);

        if (!rtHash) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(account.id, account.email);
        await this.updateRtHash(account.id, tokens.refresh_token);

        return tokens;
    }

    async updateRtHash(id: string, rtToken: string) {

        const hash = await this.hasData(rtToken);

        await this.prisma.account.update({
            where: { id: id },
            data: { hashedRt: hash }
        })
    }

    hasData(data: string) {
        return bcrypt.hash(data, 10);
    }

    async getTokens(id: string, email: string): Promise<Tokens> {

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: id,
                email
            },
                {
                    secret: jwtAtSecret.secret,
                    expiresIn: 60 * 15,
                }
            ),
            this.jwtService.signAsync({
                sub: id,
                email
            },
                {
                    secret: jwtRtSecret.secret,
                    expiresIn: 60 * 60 * 24 * 7, // 1 Week(7 days)
                }
            )
        ]);

        return {
            access_token: at,
            refresh_token: rt
        }
    }
}
