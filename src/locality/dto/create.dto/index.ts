/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class CreateDto {

    @IsNotEmpty()
    @IsString()
    designation: string;

    @IsString()
    localityId: string
}
