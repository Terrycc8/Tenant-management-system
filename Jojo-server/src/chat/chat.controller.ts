import { Controller, Get, Request, Response, Next } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';

@Controller()
export class ChatController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('chat')
  async chat(@Request() req, @Response() res, @Next() next) {
    res.render('./Chat/chat', { title: 'Chat Room' });
  }
}
