import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = {
      email,
      name: 'test',
    };

    // const jwt = await this.jwtService.signAsync({ id: 1 });
    // response.cookie('jwt', jwt, { httpOnly: true });
    return user;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'Success',
    };
  }
}
