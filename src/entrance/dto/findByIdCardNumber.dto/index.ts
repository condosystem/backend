/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class FindByIdCardNumberDto {
    @IsNotEmpty()
    @IsString()
    idCardNumber: string;
}