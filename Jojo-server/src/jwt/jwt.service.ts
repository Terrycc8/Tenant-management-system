import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IncomingMessage } from 'http';
import { encode, decode } from 'jwt-simple';
import { Bearer } from 'permit';
import { env } from 'src/env';
import { JWTPayload } from 'src/types';
const permit = new Bearer({
  query: 'access_token',
})
@Injectable({})
export class JwtService {
  decode(headers): JWTPayload {

    let req = { headers, url: headers.url }
    let token: string;
    try {

      token = permit.check(req as any);

    } catch (error) {

      throw new UnauthorizedException('missing jwt token');
    }
    if (!token) {
      throw new UnauthorizedException('empty jwt token');
    }
    console.log(1)
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
