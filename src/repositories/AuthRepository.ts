/* eslint-disable prettier/prettier */
import { AuthDto } from 'src/auth/dto';
import { Tokens } from 'src/types';

export interface AuthRepository {
  signup(dto: AuthDto): Promise<Tokens>;
  findByEmail(email: string);
  findAll();
  signin({ email, password }): Promise<Tokens>;
  logout(id: string);
  refresh(id: string, refreshToken: string);
}
