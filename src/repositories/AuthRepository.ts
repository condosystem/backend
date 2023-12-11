/* eslint-disable prettier/prettier */
import { AuthDto } from 'src/dto';
import { Tokens } from 'src/types';

export interface AuthRepository {
  signup(dto: AuthDto): Promise<Tokens>;
  findByEmail(email: string);
  signin(dto: AuthDto): Promise<Tokens>;
  logout(id: string);
  updateRtHash(id: string, rtToken: string);
  refresh(id: string, refreshToken: string);
}
