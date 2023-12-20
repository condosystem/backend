/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    localityId: string;
    
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    sectorId: string;
}
