/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { CreateDto } from './dto';
import { EntranceService } from './entrance.service';
import { transform, trim } from 'src/functions';


@Controller('entrances')
export class EntranceController {
    constructor(
        private entranceService: EntranceService
    ) { }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@GetCurrentUserId() id: string, @Body() { fingerprint, unityId }: CreateDto) {
        return this.entranceService.create({
            fingerprint: trim(fingerprint),
            unityId: trim(unityId),
            userId: trim(id)
        });
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.entranceService.findAll()
    }

    @Public()
    @Get('name')
    @HttpCode(HttpStatus.OK)
    findByName(@Body() dto: string) {
        return this.entranceService.findByName(transform(dto['name']))
    }
}
