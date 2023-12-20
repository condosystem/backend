/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { Public } from 'src/common/decorators';
import { CreateDto } from './dto';
import { transform, trim } from 'src/functions';

@Controller('localities')
export class LocalityController {

    constructor(
        private localityService: LocalityService
    ) { }

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() { designation, localityId }: CreateDto) {
        return this.localityService.create({
            designation: transform(designation),
            localityId: trim(localityId)
        });
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.localityService.findAll()
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param() dto: string) {
        return this.localityService.findOne(trim(dto['id']))
    }
}
