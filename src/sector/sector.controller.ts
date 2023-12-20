/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { SectorService } from './sector.service';
import { transform, trim } from 'src/functions';
import { CreateDto } from './dto';

@Controller('sectors')
export class SectorController {
    constructor(
        private sectorService: SectorService
    ) { }

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() { name, email, ministryId }: CreateDto) {
        return this.sectorService.create({
            name: transform(name),
            email: trim(email),
            ministryId: trim(ministryId)
        });
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.sectorService.findAll()
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param() dto: string) {
        return this.sectorService.findOne(trim(dto['id']))
    }
}
