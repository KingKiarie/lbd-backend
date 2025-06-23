import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(email: string, password: string, name?: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) throw new Error('email already Exists');

    const hash = await bcrypt.hash(password, 6);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        name?,
      },
    });
    return {
      message: 'Signup succcessful',
      user: { id: user.id, email: user.email },
    };
  }

  async login(email: string, password: string){
    const user = await this.prisma.user.findUnique({where: {email}})
    if(!user || !(await bcrypt.compare(password, user.password))){
        throw new Error('invalid credentials: check again')
    }

    const token = this.jwtService.sign({
        sub: user.id,
        email: user.email
    })
    return{access_token: token}
  }
}
