/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto';

@Injectable()
export class UnityService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create({ name, localityId, sectorId }: CreateDto) {

        const sectorNotFound = await this.prisma.sector.findUnique({
            where: {
                id: sectorId,
            }
        });

        if (!sectorNotFound) throw new NotFoundException('Sector not found.');

        const localityNotFound = await this.prisma.locality.findUnique({
            where: {
                id: localityId,
            }
        });

        if (!localityNotFound) throw new NotFoundException('Locality not found.');

        const unityAlreadyExists = await this.prisma.unity.findFirst({
            where: {
                name,
                sectorId
            }
        });
        
        if (unityAlreadyExists) throw new ConflictException('Unity already exists.');

        const unity = await this.prisma.unity.create({
            data: {
                name,
                localityId,
                sectorId
            }
        });

        return unity;
    }

    async findAll() {

        const ministries = await this.prisma.unity.findMany({
            include: {
                Entrances: true
            }
        });

        return ministries;
    }

    async findOne(id: string) {

        const unity = await this.prisma.unity.findUnique({
            where: { id },
            include: {
                Entrances: true
            }
        });

        if (!unity) throw new NotFoundException('Unity not found.');

        return unity;
    }
}
