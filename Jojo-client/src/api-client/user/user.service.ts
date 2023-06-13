import { Body, Controller, Get, Header, Post, UnauthorizedException, ValidationPipe, injectNestClient } from 'nest-client';
import { Headers } from 'nest-client';
import { LoginInputWithPasswordDto } from 'src/dto/post-login.dto';
import { SignUpInputWithPasswordDto } from 'src/dto/post-signup.dto';


@Controller('user')
export class UserService {
    constructor() {
        injectNestClient(this)
    }

    @Post('login')
    async loginWithPassword(@Body(new ValidationPipe()) loginInput: LoginInputWithPasswordDto, @Headers() headers: string) {
        throw new Error("stub")
    }

    @Post('signup')
    async signUp(@Body(new ValidationPipe()) signUpInput: SignUpInputWithPasswordDto) {
        throw new Error("stub")
    }

    @Post('signup')
    async getUsers() {
        throw new Error("stub")
    }

    @Get('profile')
    getProfile(@Headers('Authorization') authorization: string, @Headers() headers: string) {
        throw new Error("stub")
    }
}
