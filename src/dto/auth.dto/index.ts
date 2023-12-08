/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class AuthDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}