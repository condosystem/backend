/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateDto } from './dto';
import { PersonService } from './person.service';
import { transform, trim } from 'src/functions';


@Controller('persons')
export class PersonController {
    constructor(
        private personService: PersonService
    ) { }

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() { name, fingerprint, idCardNumber, localityId }: CreateDto) {
        return this.personService.create({
            name: transform(name),
            fingerprint: trim(fingerprint),
            idCardNumber: trim(idCardNumber),
            localityId: trim(localityId)
        });
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.personService.findAll()
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param() dto: string) {
        return this.personService.findOne(trim(dto['id']))
    }
}
