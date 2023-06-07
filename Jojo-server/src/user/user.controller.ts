import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from '@nestjs/common';
import { LoginInputWithPasswordDto } from 'src/dto/post-login.dto';
import { SignUpInputWithPasswordDto } from 'src/dto/post-signup.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  loginWithPassword(
    @Body(new ValidationPipe()) loginInput: LoginInputWithPasswordDto,
  ) {
    return this.userService.loginWithPassword(loginInput);
  }
  @Post('signup')
  signUp(@Body(new ValidationPipe()) signUpInput: SignUpInputWithPasswordDto) {
    return this.userService.signUp(signUpInput);
  }
}
