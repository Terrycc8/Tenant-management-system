import { Body, Controller, Get, Header, Post, UnauthorizedException, ValidationPipe, injectNestClient } from 'nest-client';
import {  } from 'nest-client';
import { LoginInputWithPasswordDto } from 'src/dto/post-login.dto';
import { SignUpInputWithPasswordDto } from 'src/dto/post-signup.dto';
import { JWTPayload, uploadDir } from 'src/types';


@Controller('user')
export class UserService {
    constructor() {
        injectNestClient(this)
    }

  // @Post('signup')
  // async getUsers() {}

    @Post('login')
    async loginWithPassword(@Body(new ValidationPipe()) loginInput: LoginInputWithPasswordDto, @Request() headers: string) {
        throw new Error("stub")
    }

    @Post('signup')
    async signUp(@Body(new ValidationPipe()) signUpInput: SignUpInputWithPasswordDto) {
        throw new Error("stub")
    }

    @Get('profile')
    getProfile(@Request() headers: string) {
        throw new Error("stub")
    }

    @Get('account')
    async account(@Body(new ValidationPipe()) signUpInput: SignUpInputWithPasswordDto) {
        throw new Error("stub")
    }

    @Get()
    users(@Request() req: string) {
        throw new Error("stub")
    }

    @Get('/contacts')
    async getContractList(@Request() req: string) {
        throw new Error("stub")
    }
}
