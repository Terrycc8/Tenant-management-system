import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { IncomingMessage } from 'http';
import { encode, decode } from 'jwt-simple';
import { Bearer } from 'permit';
import { env } from 'src/env';
import { JWTPayload } from 'src/types';
const permit = new Bearer({
  query: 'access_token',
});
@Injectable({})
export class JwtService {
  decode(req: Request): JWTPayload {
    let token: string;
    try {
      token = permit.check(req);
    } catch (error) {
      throw new UnauthorizedException('missing jwt token');
    }
    if (!token) {
      throw new UnauthorizedException('empty jwt token');
    }

    let payload = decode(token, env.JWT_SECRET);
    if (!payload) {
      throw new ForbiddenException('invalid jwt token');
    }

    return payload;
  }
  encode(payload: JWTPayload) {
    return encode(payload, env.JWT_SECRET);
  }
}
