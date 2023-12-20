/* eslint-disable prettier/prettier */

import { AccountTypeDto } from "src/account-type/dto";

export interface AccountTypeRepository {
  signup(dto: AccountTypeDto);
}
