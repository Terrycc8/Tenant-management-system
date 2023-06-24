import { BadRequestException, Controller, Get } from '@nestjs/common';
import { IndexService } from './index.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Request } from '@nestjs/common';
import { userRole } from 'src/types';

@Controller('')
export class IndexController {
  constructor(
    private indexService: IndexService,
    private jwtService: JwtService,
  ) {}
  @Get()
  getHomePageInfo(@Request() req) {
    let jwtPayLoad = this.jwtService.decode(req);

    if (!jwtPayLoad.verified) {
      throw new BadRequestException(
        'Your account is not activated, please check registered email',
      );
    }
    if (jwtPayLoad.role == userRole.landlord) {
      return this.indexService.getHomePageInfoLandLord(jwtPayLoad);
    } else if (jwtPayLoad.role == userRole.tenant) {
      return this.indexService.getHomePageInfoTenant(jwtPayLoad);
    } else {
      throw new BadRequestException('Unknown user type');
    }
  }
}
