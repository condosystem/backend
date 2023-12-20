/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class AccountTypeDto {

    @IsNotEmpty()
    @IsString()
    designation: string;
}
