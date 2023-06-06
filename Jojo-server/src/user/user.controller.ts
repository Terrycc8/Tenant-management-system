import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from '@nestjs/common';
import { LoginInputDto } from 'src/dto/post-login.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  login(@Body() loginInput: LoginInputDto) {
    console.log(loginInput);
    return this.userService.login(loginInput);
  }
}
