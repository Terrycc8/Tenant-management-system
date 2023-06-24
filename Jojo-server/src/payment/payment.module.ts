import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, JwtService],
})
export class PaymentModule {}
