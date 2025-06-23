import { Injectable, ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AuthService{
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    )
}