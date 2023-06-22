<<<<<<< HEAD
import { Module } from '@nestjs/common';
// import { PaymentController } from './payment.controller';
// import { PaymentService } from './payment.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  // controllers: [PaymentController],
  // providers: [PaymentService],
})
export class PaymentModule {}
=======
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
>>>>>>> 214393992464d58d9c3f0ab35685260051b106de
