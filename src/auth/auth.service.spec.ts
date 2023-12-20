/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/prisma/prisma.service';
import { describe, expect, it } from 'vitest';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';


const prismaService = new PrismaService();
const jwtService = new JwtService();
const sut = new AuthService(prismaService, jwtService); // sut = system under test


describe("Authentication User", () => {


  const email = "samisabino23@gmail.com";
  const password = "testpassword";
  const accountTypeId = "2121";

  it("not should create an account", () => {
    expect(
      sut.signup({
        email,
        password,
        accountTypeId
      })
    ).rejects.toThrow
  });

  it("should make signin of user", () => {
    expect(
      sut.signin({
        email,
        password
      })
    ).resolves
  });
});