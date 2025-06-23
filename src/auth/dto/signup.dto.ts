import { isEmail, isString, MinLength } from 'class-validator';

export class SignupDto{
    @isEmail()
    email:string

    @isString()
    @MinLength(6)
    password:string
}
