import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signup(@Body() body: { email: string; password: string; name?: string }) {
    return this.authService.signup(body.email, body.password, body.name);
  }
}
