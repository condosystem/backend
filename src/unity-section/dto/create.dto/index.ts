/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    sectionId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    unityId: string;
}
