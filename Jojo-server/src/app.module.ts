import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { ComplaintModule } from './complaint/complaint.module';

@Module({
  imports: [ChatModule, UserModule, ComplaintModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
