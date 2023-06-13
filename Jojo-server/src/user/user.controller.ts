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
    let { isCorrectPassword, jwtPayload } =
      await this.userService.loginWithPassword(loginInput);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Incorrect password');
    }
    let token = this.jwtService.encode(jwtPayload);

    return { token };
  }
  @Post('signup')
  async signUp(
    @Body(new ValidationPipe()) signUpInput: SignUpInputWithPasswordDto,
  ) {
    let payload = await this.userService.signUp(signUpInput);
    let token = this.jwtService.encode(payload);

    return { token };
  }
  @Post('signup')
  async getUsers() {}
  @Get('profile')
  getProfile(@Request() headers) {
    // let token = this.jwtService.decode();
    // let token = authorization.match(/Bearer (.*)+$/)?.[1];
    return { headers };
  }
}
