/* eslint-disable prettier/prettier */
import { describe, expect, it } from 'vitest';
import { AccountTypeService } from './account-type.service';
import { PrismaService } from 'src/prisma/prisma.service';


const prismaService = new PrismaService();
const sut = new AccountTypeService(prismaService);

describe('Account Type', () => {
  
  it('should create account type', () => {
    expect(
      sut.create({ designation: "Administrador" })
    ).resolves
  });
});