/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDto {

    @IsNotEmpty()
    @IsString()
    personId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    unityId: string
}
