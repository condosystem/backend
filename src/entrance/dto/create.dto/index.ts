/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDto {

    @IsNotEmpty()
    @IsString()
    idCardNumber: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    sectionId: string;
}
