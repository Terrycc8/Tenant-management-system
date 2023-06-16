import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from '@nestjs/common';
import { LoginInputWithPasswordDto } from 'src/dto/post-login.dto';
import { SignUpInputWithPasswordDto } from 'src/dto/post-signup.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { JWTPayload, uploadDir } from 'src/types';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async loginWithPassword(
    @Body(new ValidationPipe()) loginInput: LoginInputWithPasswordDto,
    @Request() headers,
  ) {
    let jwtPayload = await this.userService.loginWithPassword(loginInput);

    let token = this.jwtService.encode(jwtPayload);

    return { token, role: jwtPayload.role };
  }
  @Post('signup')
  async signUp(
    @Body(new ValidationPipe()) signUpInput: SignUpInputWithPasswordDto,
  ) {
    let jwtPayload = await this.userService.signUp(signUpInput);

    let token = this.jwtService.encode(jwtPayload);

    return { token, role: jwtPayload.role };
  }
  // @Post('signup')
  // async getUsers() {}
  @Get('profile')
  getProfile(@Request() headers) {
    // let token = this.jwtService.decode();
    // let token = authorization.match(/Bearer (.*)+$/)?.[1];
    return { headers };
  }
  @Get('account')
  async account(
    @Body(new ValidationPipe()) signUpInput: SignUpInputWithPasswordDto,
  ) {
    let payload = await this.userService.signUp(signUpInput);
    let token = this.jwtService.encode(payload);

    return { token };
  }

  @Get()
  users(@Request() req) {
    try {
      let payLoad: JWTPayload = this.jwtService.decode(req);

      return this.userService.users(payLoad);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @Get('/contacts')
  async getContractList(@Request() req) {
    let payLoad: JWTPayload = this.jwtService.decode(req);
    return await this.userService.getContactList(payLoad);
  }
}
