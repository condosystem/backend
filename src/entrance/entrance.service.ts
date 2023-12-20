/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EntranceService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create({ userId, fingerprint, unityId }) {

        const account = await this.prisma.account.findUnique({
            where: { id: userId },
            include: {
                Employee: true
            }
        });

        if (!account) throw new NotFoundException('Account not found.');

        const person = await this.prisma.person.findFirst({
            where: {
                fingerprint
            }
        });

        if (!person) throw new NotFoundException('Person not found.');


        const unity = await this.prisma.unity.findUnique({
            where: {
                id: unityId,
            }
        });

        if (!unity) throw new NotFoundException('Unity not found.');

        const employee = await this.prisma.employee.findUnique({
            where: {
                id: account.Employee.id
            }
        });

        if (!employee) throw new NotFoundException('Employee not found.');

        if (person.idCardNumber === employee.personId) throw new ConflictException("Employee responsible should be different of Person.")

        const entrance = await this.prisma.entrance.create({
            data: {
                personId: person.idCardNumber,
                unityId,
                employeeId: employee.personId
            }
        });

        return entrance;
    }

    async findAll() {

        const ministries = await this.prisma.entrance.findMany({
            include: {
                Person: true,
                Unity: true,
                Employee: true
            }
        });

        return ministries;
    }

    async findByName(name: string) {

        const person = await this.prisma.person.findFirst({
            where: { name }
        });

        if (!person) throw new NotFoundException('Person not found.');
        
        const entrance = await this.prisma.entrance.findFirst({
            where: { personId: person.idCardNumber },
            include: {
                Person: true,
                Unity: {
                    include: {
                        locality: {
                            include: {
                                locality: {
                                    include: {
                                        locality: {
                                            include: {
                                                locality: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!entrance) throw new NotFoundException('Entrance not found.');

        return entrance;
    }
}
