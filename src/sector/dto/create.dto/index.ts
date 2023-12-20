/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    ministryId: string;
}
