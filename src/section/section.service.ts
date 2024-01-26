/* eslint-disable prettier/prettier */

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto';

@Injectable()
export class SectionService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create({ name }: CreateDto) {

        const sectionAlreadyExists = await this.prisma.section.findFirst({
            where: { name }
        });

        if (sectionAlreadyExists) throw new ConflictException('Section already exists.');

        const section = await this.prisma.section.create({
            data: { name }
        });

        return section;
    }

    async findAll() {

        const sections = await this.prisma.section.findMany({
            include: {
                UnitySection: true
            },
            orderBy: { name: 'asc' }
        });

        return sections;
    }

    async findOne(id: string) {

        const section = await this.prisma.section.findUnique({
            where: { id },
            include: {
                UnitySection: true
            }
        });

        if (!section) throw new NotFoundException('Section not found.');

        return section;
    }
}