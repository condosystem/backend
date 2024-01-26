/* eslint-disable prettier/prettier */
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindByNameDto } from './dto/findByName.dto';
import { FindByIdCardNumberDto } from './dto/findByIdCardNumber.dto';

@Injectable()
export class EntranceService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create({ userId, idCardNumber, sectionId }) {

        const section = await this.prisma.section.findUnique({
            where: {
                id: sectionId,
            }
        });

        if (!section) throw new NotFoundException('Section not found.');

        const account = await this.prisma.account.findUnique({
            where: {
                id: userId,
            },
            include: {
                Employee: true,
                AccountType: true
            }
        });

        if (!account) throw new NotFoundException('Account not found.');

        if (!account.status) throw new ForbiddenException('Access denied.');

        if (account.AccountType.designation.toLowerCase() !== 'funcionario') throw new ForbiddenException('Access denied.');

        const person = await this.prisma.person.findFirst({
            where: {
                idCardNumber
            }
        });

        if (!person) throw new NotFoundException('Person not found.');

        const unity = await this.prisma.unity.findUnique({
            where: {
                id: account.Employee.unityId,
            }
        });

        if (!unity) throw new NotFoundException('Unity not found.');

        const employee = await this.prisma.employee.findUnique({
            where: {
                id: account.Employee.id
            }
        });

        if (!employee) throw new NotFoundException('Employee not found.');

        if (person.idCardNumber === employee.personId) throw new ConflictException("Employee responsible should be different of Person.");

        const unitySection = await this.prisma.unitySection.findFirst({
            where: {
                unityId: account.Employee.unityId,
                sectionId
            }
        });

        if (!unitySection) throw new NotFoundException('UnitySection not found.');

        const entrance = await this.prisma.entrance.create({
            data: {
                personId: person.idCardNumber,
                unitySectionId: unitySection.id,
                employeeId: employee.personId
            }
        });

        return entrance;
    }

    async findAll() {

        const entrances = await this.prisma.entrance.findMany({
            include: {
                Person: true,
                UnitySection: {
                    include: {
                        Unity: true,
                        Section: true
                    }
                },
                Employee: true
            },
            orderBy: { createdAt: 'asc' }
        });

        return entrances;
    }

    async findByName({ name }: FindByNameDto) {

        const person = await this.prisma.person.findFirst({
            where: { name }
        });

        if (!person) throw new NotFoundException('Person not found.');

        const entrances = await this.prisma.entrance.findMany({
            where: { personId: person.idCardNumber },
            include: {
                Person: true,
                UnitySection: {
                    include: {
                        Unity: true,
                        Section: true
                    }
                },
                Employee: {
                    include: {
                        Person: true
                    }
                }
            },
        });

        if (!entrances) throw new NotFoundException('Entrances not found.');

        return entrances;
    }

    async findByIdCardNumber({ idCardNumber }: FindByIdCardNumberDto) {

        const person = await this.prisma.person.findFirst({
            where: { idCardNumber }
        });

        if (!person) throw new NotFoundException('Person not found.');

        const entrances = await this.prisma.entrance.findMany({
            where: { personId: person.idCardNumber },
            include: {
                Person: {
                    include: {
                        locality: true
                    }
                },
                UnitySection: {
                    include: {
                        Unity: {
                            include: {
                                locality: true
                            }
                        },
                        Section: true
                    }
                },
                Employee: {
                    include: {
                        Person: {
                            include:{
                                locality: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (!entrances) throw new NotFoundException('Entrances not found.');

        return entrances;
    }
}
