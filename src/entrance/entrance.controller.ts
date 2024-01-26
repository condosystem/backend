/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { CreateDto } from './dto';
import { EntranceService } from './entrance.service';
import { transform, trim } from 'src/functions';
import { FindByNameDto } from './dto/findByName.dto';
import { FindByIdCardNumberDto } from './dto/findByIdCardNumber.dto';


@Controller('entrances')
export class EntranceController {
    constructor(
        private entranceService: EntranceService
    ) { }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@GetCurrentUserId() id: string, @Body() { idCardNumber, sectionId }: CreateDto) {
        return this.entranceService.create({
            idCardNumber: trim(idCardNumber),
            sectionId: trim(sectionId),
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
    findByName(@Body() { name }: FindByNameDto) {
        return this.entranceService.findByName({ name: transform(name) })
    }

    @Public()
    @Get(':idCardNumber')
    @HttpCode(HttpStatus.OK)
    findByIdCardNumber(@Param() { idCardNumber }: FindByIdCardNumberDto) {
        return this.entranceService.findByIdCardNumber({ idCardNumber: trim(idCardNumber) })
    }
}
