/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto';
import { Tokens } from 'src/types';
//import { AuthRepository } from 'src/repositories/AuthRepository';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';

@Controller('auth')
export class AuthController /*implements AuthRepository*/ {
    constructor(
        private authService: AuthService
    ) { }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signup(dto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signin(dto);
    }

    @Post('email')
    @HttpCode(HttpStatus.OK)
    findByEmail(email: string) {
        return this.authService.findByEmail(email);
    }

    @Post('update')
    @HttpCode(HttpStatus.OK)
    updateRtHash(id: string, rtToken: string) {
        return this.authService.updateRtHash(id, rtToken);
    }

    @UseGuards(AtGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() id: string) {
        return this.authService.logout(id);
    }

    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refresh(
        @GetCurrentUserId() id: string,
        @GetCurrentUser('refreshToken') refreshToken: string
    ) {
        return this.authService.refresh(id, refreshToken);
    }
}
