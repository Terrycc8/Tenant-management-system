import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
