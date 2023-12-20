/* eslint-disable prettier/prettier */
import { AccountTypeController } from './account-type.controller';
import { describe, expect, it } from 'vitest';
import { AccountTypeService } from './account-type.service';
import { PrismaService } from 'src/prisma/prisma.service';

const prismaService = new PrismaService();
const accountTypeService = new AccountTypeService(prismaService);

describe('AccountTypeController', () => {
  const sut = new AccountTypeController(accountTypeService);

  it('should create account type', () => {
    expect(
      sut.create({ designation: "Admin" })
    ).resolves
  });
});

//.toEqual("admin".toLowerCase() || "funcionario".toLowerCase())
