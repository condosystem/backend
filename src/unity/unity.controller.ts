/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { UnityService } from './unity.service';
import { CreateDto } from './dto';
import { transform, trim } from 'src/functions';

@Controller('unities')
export class UnityController {
    constructor(
        private unityService: UnityService
    ) { }

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() { name, localityId, sectorId }: CreateDto) {
        return this.unityService.create({
            name: transform(name),
            localityId: trim(localityId),
            sectorId: trim(sectorId)
        });
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.unityService.findAll()
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param() dto: string) {
        return this.unityService.findOne(trim(dto['id']))
    }
}
