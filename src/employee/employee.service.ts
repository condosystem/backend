/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create({ personId, unityId }: CreateDto) {

        const unity = await this.prisma.unity.findUnique({
            where: {
                id: unityId
            }
        });

        if (!unity) throw new NotFoundException('Unity not found.');

        const person = await this.prisma.person.findUnique({
            where: {
                idCardNumber: personId
            }
        });

        if (!person) throw new NotFoundException('Person not found.');

        const employeeAlreadyExists = await this.prisma.employee.findUnique({
            where: {
                personId
            }
        });

        if (employeeAlreadyExists) throw new ConflictException('Employee already exists.');

        const employee = await this.prisma.employee.create({
            data: {
                personId,
                unityId
            }
        });

        return employee;
    }

    async findAll() {

        const employees = await this.prisma.employee.findMany({
            include: {
                Person: true,
                Entrances: true,
            },
            orderBy: {
                Person: {
                    name: 'asc'
                }
            }
        });

        return employees;
    }

    async findOne(id: string) {

        const employee = await this.prisma.employee.findUnique({
            where: { id },
            include: {
                Person: true,
                Entrances: true,
            }
        });

        if (!employee) throw new NotFoundException('Employee not found.');

        return employee;
    }
}
