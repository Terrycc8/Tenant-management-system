import { Controller, Get } from '@nestjs/common';
import { IndexService } from './index.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Request } from '@nestjs/common';

@Controller('')
export class IndexController {
  constructor(
    private indexService: IndexService,
    private jwtService: JwtService,
  ) {}
  @Get()
  getHomePageInfo(@Request() req) {
    let jwtPayLoad = this.jwtService.decode(req);
    return this.indexService.getHomePageInfo(jwtPayLoad);
  }
}
