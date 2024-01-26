/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateDto } from './dto';
import { EmployeeService } from './employee.service';
import { trim } from 'src/functions';


@Controller('employees')
export class EmployeeController {
    constructor(
        private employeeService: EmployeeService
    ) { }

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() { personId, unityId }: CreateDto) {
        return this.employeeService.create({
            personId: trim(personId),
            unityId: trim(unityId),
        });
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.employeeService.findAll()
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param() dto: string) {
        return this.employeeService.findOne(trim(dto['id']))
    }


}
