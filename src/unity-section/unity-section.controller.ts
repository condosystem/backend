/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateDto } from './dto';
import { trim } from 'src/functions';
import { UnitySectionService } from './unity-section.service';

@Controller('unitySection')
export class UnitySectionController {
    constructor(
        private unitySectionService: UnitySectionService
    ) { }

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() { sectionId, unityId }: CreateDto) {
        return this.unitySectionService.create({
            sectionId: trim(sectionId),
            unityId: trim(unityId),
        });
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.unitySectionService.findAll()
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param() dto: string) {
        return this.unitySectionService.findOne(trim(dto['id']))
    }
}
