/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { MinistryService } from './ministry.service';
import { CreateDto } from './dto';
import { transform, trim } from 'src/functions';

@Controller('ministries')
export class MinistryController {

    constructor(
        private ministryService: MinistryService
    ) { }

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateDto) {
        return this.ministryService.create({
            name: transform(dto.name),
            email: trim(dto.email)
        });
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.ministryService.findAll()
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param() dto: string) {
        return this.ministryService.findOne(trim(dto['id']))
    }
}
