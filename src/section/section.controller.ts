/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateDto } from './dto';
import { transform, trim } from 'src/functions';
import { SectionService } from './section.service';

@Controller('sections')
export class SectionController {
    constructor(
        private sectionService: SectionService
    ) { }

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() { name }: CreateDto) {
        return this.sectionService.create({
            name: transform(name)
        });
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.sectionService.findAll()
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param() dto: string) {
        return this.sectionService.findOne(trim(dto['id']))
    }
}
