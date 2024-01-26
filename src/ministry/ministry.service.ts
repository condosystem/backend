/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto';

@Injectable()
export class MinistryService {
    constructor(
        private prisma: PrismaService
    ) { }

    async create({ name, email }: CreateDto) {

        const ministryAlreadyExists = await this.prisma.ministry.findFirst({
            where: {
                name
            }
        });

        if (ministryAlreadyExists) throw new ConflictException('Ministry already exists.');

        const ministry = await this.prisma.ministry.create({
            data: {
                name,
                email: email.toLowerCase()
            }
        });

        return ministry;
    }

    async findAll() {

        const ministries = await this.prisma.ministry.findMany({
            include: {
                Sectors: true
            },
            orderBy: { name: 'asc' }
        });

        return ministries;
    }


    async findOne(id: string) {

        const ministry = await this.prisma.ministry.findUnique({
            where: { id },
            include: {
                Sectors: true
            }
        });

        if (!ministry) throw new NotFoundException('Ministry not found.');

        return ministry;
    }
}
