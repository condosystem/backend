/* eslint-disable prettier/prettier */
import { Request } from 'express';
import { AuthDto } from 'src/dto';
import { Tokens } from 'src/types';

export interface AuthRepository {
  signup(dto: AuthDto): Promise<Tokens>;
  findByEmail(email: string);
  signin(dto: AuthDto): Promise<Tokens>;
  logout(req: Request);
  updateRtHash(id:string, rtToken: string);
  refresh(req: Request);
}
