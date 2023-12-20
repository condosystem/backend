/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto';


@Injectable()
export class PersonService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create({ name, localityId, fingerprint, idCardNumber }: CreateDto) {

        const localityNotFound = await this.prisma.locality.findUnique({
            where: {
                id: localityId,
            }
        });

        if (!localityNotFound) throw new NotFoundException('Locality not found.');

        const personAlreadyExists = await this.prisma.person.findUnique({
            where: {
                idCardNumber
            }
        });

        if (personAlreadyExists) throw new ConflictException('Person already exists.');

        const person = await this.prisma.person.create({
            data: {
                name,
                localityId,
                fingerprint,
                idCardNumber
            }
        });

        return person;
    }

    async findAll() {

        const ministries = await this.prisma.person.findMany({
            include: {
                Entrances: true
            }
        });

        return ministries;
    }

    async findOne(id: string) {

        const person = await this.prisma.person.findUnique({
            where: { id },
            include: {
                Entrances: true
            }
        });

        if (!person) throw new NotFoundException('Person not found.');

        return person;
    }
}
