/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsEmail, IsString, IsUUID } from "class-validator";

export class AuthDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    accountTypeId: string;

    @IsNotEmpty()
    @IsString()
    employeeId: string;
}
