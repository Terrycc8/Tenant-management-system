import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Redirect,
  Res,
  Response,
  UnauthorizedException,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from '@nestjs/common';
import {
  LoginInputWithPasswordDto,
  LoginInputWithFaceBookDto,
} from 'src/dto/post-login.dto';
import { SignUpInputWithPasswordDto } from 'src/dto/post-signup.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { JWTPayload, uploadDir } from 'src/types';
import { filesInterceptorConfig } from 'src/helper';
import { IDParamDto } from 'src/dto/IDParams';
import { PropertyInputDto } from 'src/dto/post-property.dto';
import { PatchUserInputDto } from 'src/dto/patch-user.dto';
import { env } from 'src/env';

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
  @Post('login/facebook')
  async loginWithFaceBook(
    @Body(new ValidationPipe()) loginFBInput: LoginInputWithFaceBookDto,
  ) {
    let jwtPayload = await this.userService.loginWithFaceBook(loginFBInput);
    let token = this.jwtService.encode(jwtPayload);
    return { token, role: jwtPayload.role };
  }
  @Patch('/:id')
  @UseInterceptors(filesInterceptorConfig(1))
  async patchUser(
    @UploadedFiles()
    image: Express.Multer.File[],
    @Request() req,
    @Param(new ValidationPipe()) params: IDParamDto,
    @Body(new ValidationPipe()) patchUserInput: PatchUserInputDto,
  ) {
    const jwtPayLoad = this.jwtService.decode(req);

    return await this.userService.patchUser(
      jwtPayLoad,
      patchUserInput,
      params.id.toString(),
      image,
    );
  }
  @Post('signup')
  async signUp(
    @Body(new ValidationPipe()) signUpInput: SignUpInputWithPasswordDto,
  ) {
    let jwtPayload = await this.userService.signUp(signUpInput);

    return {};
  }
  @Get('activate')
  async activate(
    @Query('token') activate_token: string,
    @Query('id', ParseIntPipe) id: number,
    @Response() res,
  ) {
    try {
      console.log(`${env.CLIENT_DOMAIN}${env.CLIENT_PORT}/tab/home`);
      let jwtPayload = await this.userService.activate(activate_token, id);
      let token = this.jwtService.encode(jwtPayload);

      res.redirect(`${env.SERVER_DOMAIN}${env.CLIENT_PORT}/tab/home`);
    } catch (error) {
      res.json({ error });
    }
  }
  @Delete()
  async deleteAccount(@Request() req) {
    const jwtPayLoad = this.jwtService.decode(req);

    return await this.userService.deleteAccount(jwtPayLoad);
  }
  // @Post('signup')
  // async getUsers() {}
  @Get('profile')
  async getProfile(@Request() req) {
    const jwtPayLoad = this.jwtService.decode(req);

    return await this.userService.getProfile(jwtPayLoad);
  }

  @Get('tenants')
  async getTenants(@Request() req) {
    const jwtPayLoad = this.jwtService.decode(req);

    return await this.userService.getTenants(jwtPayLoad);
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
