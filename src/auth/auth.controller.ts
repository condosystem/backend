/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/auth/dto';
import { Tokens } from 'src/types';
import { AuthRepository } from 'src/repositories/AuthRepository';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { trim } from 'src/functions';

@Controller('auth')
export class AuthController implements AuthRepository {
    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() { email, password, accountTypeId, employeeId }: AuthDto): Promise<Tokens> {
        return this.authService.signup({
            email: trim(email.toLowerCase()),
            password: trim(password),
            accountTypeId: trim(accountTypeId),
            employeeId: trim(employeeId)
        });
    }

    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.authService.findAll()
    }
    
    @Public()
    @Get('email')
    @HttpCode(HttpStatus.OK)
    findByEmail(@Body() email: string) {
        return this.authService.findByEmail(trim(email.toLowerCase()))
    }

    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() { email, password }): Promise<Tokens> {
        return this.authService.signin({ email: trim(email.toLowerCase()), password: trim(password) });
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() id: string) {
        return this.authService.logout(trim(id));
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refresh(
        @GetCurrentUserId() id: string,
        @GetCurrentUser('refreshToken') refreshToken: string
    ) {
        return this.authService.refresh(trim(id), trim(refreshToken));
    }
}
