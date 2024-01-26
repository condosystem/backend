/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectorService {
    constructor(
        private prisma: PrismaService
    ) { }

    async create({ name, email, ministryId }: CreateDto) {

        const ministryNotFound = await this.prisma.ministry.findUnique({
            where: {
                id: ministryId,
            }
        });

        if (!ministryNotFound) throw new NotFoundException('Ministry not found.');

        const sectorAlreadyExists = await this.prisma.sector.findFirst({
            where: {
                name
            }
        });

        if (sectorAlreadyExists) throw new ConflictException('Sector already exists.');

        const sector = await this.prisma.sector.create({
            data: {
                name,
                email: email.toLowerCase(),
                ministryId
            }
        });

        return sector;
    }

    async findAll() {

        const sectors = await this.prisma.sector.findMany({
            include: {
                Unities: true
            },
            orderBy: { name: 'asc' }
        });

        return sectors;
    }

    async findOne(id: string) {

        const sector = await this.prisma.sector.findUnique({
            where: { id },
            include: {
                Unities: true
            }
        });

        if (!sector) throw new NotFoundException('Sector not found.');

        return sector;
    }
}
