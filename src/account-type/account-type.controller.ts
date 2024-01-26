/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AccountTypeService } from './account-type.service';
import { Public } from 'src/common/decorators';
import { AccountTypeDto } from './dto';
import { transform } from 'src/functions';

@Controller('accountType')
export class AccountTypeController {

    constructor(
        private accountTypeService: AccountTypeService
    ) { }

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() { designation }: AccountTypeDto) {
        return this.accountTypeService.create({
            designation: transform(designation)
        })
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.accountTypeService.findAll()
    }

    @Public()
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param() dto: string) {
        return this.accountTypeService.findOne(dto['id'])
    }
}   
