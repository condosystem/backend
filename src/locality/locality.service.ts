/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto';

@Injectable()
export class LocalityService {
    constructor(
        private prisma: PrismaService
    ) { }

    async create({ designation, localityId }: CreateDto) {

        if (localityId === '') {

            const localityAlreadyExists = await this.prisma.locality.findFirst({
                where: {
                    localityId: null,
                    designation,
                }
            });

            if (localityAlreadyExists) throw new ConflictException('Locality already exists.');

            const locality = await this.prisma.locality.create({
                data: {
                    designation,
                }
            });

            return locality;

        } else {

            const localityNotFound = await this.prisma.locality.findUnique({
                where: {
                    id: localityId,
                }
            });

            if (!localityNotFound) throw new NotFoundException('Locality not found.');

            const localityAlreadyExists = await this.prisma.locality.findFirst({
                where: {
                    localityId,
                    designation,
                }
            });

            if (localityAlreadyExists) throw new ConflictException('Locality already exists.');

            const locality = await this.prisma.locality.create({
                data: {
                    localityId,
                    designation,
                }
            });

            return locality;
        }
    }

    async findAll() {

        const localities = await this.prisma.locality.findMany({
            include: {
                Localities: {
                    include: {
                        Localities: {
                            include: {
                                Localities: true
                            }
                        }
                    }
                }
            },
            orderBy: { designation: 'asc' }
        });

        return localities;
    }
    

    async findOne(id: string) {

        const locality = await this.prisma.locality.findUnique({
            where: { id },
            include: {
                Localities: {
                    include: {
                        Localities: {
                            include: {
                                Localities: true
                            }
                        }
                    }
                }
            }
        });

        if (!locality) throw new NotFoundException('Locality not found.');

        return locality;
    }
}
