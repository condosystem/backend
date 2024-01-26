/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto';
import { QrCode } from 'src/functions';


@Injectable()
export class PersonService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create({ name, localityId, idCardNumber }: CreateDto) {

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
                idCardNumber
            }
        });

        const qrCodeFilename = await QrCode(person.ksId + '-' + person.idCardNumber)

        const personUpdated = await this.prisma.person.update({
            data: {
                qrcode: qrCodeFilename.toString()
            },
            where: {
                idCardNumber
            }
        })

        return personUpdated;
    }

    async findAll() {

        const persons = await this.prisma.person.findMany({
            include: {
                Entrances: true
            },
            orderBy: { name: 'asc' }
        });

        return persons;
    }

    async findOne(idCardNumber: string) {

        const person = await this.prisma.person.findUnique({
            where: { idCardNumber },
            include: {
                Entrances: true
            }
        });

        if (!person) return null;
        //if (!person) throw new NotFoundException('Person not found.');

        return person;
    }
}
