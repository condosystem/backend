/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountTypeDto } from './dto';

@Injectable()
export class AccountTypeService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create({ designation }: AccountTypeDto) {

        const accountTypeAlreadyExists = await this.prisma.accountType.findFirst({
            where: { designation }
        });

        if (accountTypeAlreadyExists) throw new ConflictException('Account type already exists');

        const accountType = await this.prisma.accountType.create({
            data: { designation }
        });

        return accountType;
    }

    async findAll() {

        const accountType = await this.prisma.accountType.findMany();

        return accountType;
    }

    async findOne(id: string) {

        const accountType = await this.prisma.accountType.findUnique({
            where: { id }
        });

        if (!accountType) throw new NotFoundException('Account type not found.');

        return accountType;
    }
}
