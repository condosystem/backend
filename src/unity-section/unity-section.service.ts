/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto';

@Injectable()
export class UnitySectionService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create({ sectionId, unityId }: CreateDto) {

        const unity = await this.prisma.unity.findFirst({
            where: { id: unityId }
        });

        if (!unity) throw new NotFoundException('Unity not found.');

        const section = await this.prisma.section.findFirst({
            where: { id: sectionId }
        });

        if (!section) throw new NotFoundException('Section not found.');

        const unitySectionAlreadyExists = await this.prisma.unitySection.findFirst({
            where: { sectionId, unityId }
        });

        if (unitySectionAlreadyExists) throw new ConflictException('UnitySection already exists.');

        const unitySection = await this.prisma.unitySection.create({
            data: { sectionId, unityId }
        });

        return unitySection;
    }

    async findAll() {

        const unitySection = await this.prisma.unitySection.findMany({
            include: {
                Unity: true,
                Section: true
            },
        });

        return unitySection;
    }

    async findOne(id: string) {

        const unitySection = await this.prisma.unitySection.findUnique({
            where: { id },
            include: {
                Unity: true,
                Section: true
            }
        });

        if (!unitySection) throw new NotFoundException('UnitySection not found.');

        return unitySection;
    }
}
