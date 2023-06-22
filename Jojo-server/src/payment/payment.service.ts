<<<<<<< HEAD
import { BadRequestException, Injectable } from '@nestjs/common';
import { mkdirSync } from 'fs';
import { IncomingMessage } from 'http';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { PaymentInputDto } from 'src/dto/post-payment.dto';
import { JWTPayload, userRole } from 'src/types';

// @Injectable()
// export class PaymentService {
//   constructor(@InjectModel() private readonly knex: Knex) {}
//   async paymentDetail(payload: JWTPayload, payment_id: number) {
//     let thisPayment = await this.knex('payment')
//       .select('landlord_id', 'tenant_id')
//       .where({ id: payment_id })
//       .first();
//     if (!thisPayment) {
//       throw new BadRequestException(
//         'Invalid request, this property does not exist',
//       );
//     }
//     if (
//       thisPayment.landlord_id !== payload.id &&
//       thisPayment.tenant_id !== payload.id
//     ) {
//       throw new BadRequestException(
//         'Invalid request, you are not authorized to access information of this payment',
//       );
//     }

//     let result = await this.knex('payment')
//       .select(
//         'payment.id as id',

//         this.knex.raw('ARRAY_AGG(attachments) as attachments'),
//       )
//       .innerJoin(
//         'propertyAttachments',
//         'property.id',
//         'propertyAttachments.property_id',
//       )
//       .groupBy(
//         'property.id',
//         'title',
//         'area',
//         'district',
//         'location',
//         'street',
//         'building',
//         'block',
//         'floor',
//         'room',
//         'rent',
//         'tenant_id',
//         'rental_start_at',
//         'rental_end_at',
//         'property.edited_at',
//       )
//       .where({ 'payment.id': payment_id })
//       .first();

//     return result;
//   }
//   async propertyList(payload: JWTPayload) {
//     let query = this.knex('property')
//       .select(
//         'property.id as id',
//         'title',
//         'rent',
//         'rental_start_at',
//         'rental_end_at',
//         'first_name',
//         'last_name',
//         this.knex.raw('ARRAY_AGG(attachments) as attachments'),
//       )
//       .innerJoin(
//         'propertyAttachments',
//         'property.id',
//         'propertyAttachments.property_id',
//       )
//       .leftJoin('user', 'tenant_id', 'user.id')
//       .groupBy(
//         'property.id',
//         'title',
//         'rent',
//         'billing_period_from',
//         'billing_period_to',
//         'first_name',
//         'last_name',
//       );
//     if (payload.role == userRole.landlord) {
//       query = query.where({ landlord_id: payload.id });
//     } else if (payload.role == userRole.tenant) {
//       query = query.where({ tenant_id: payload.id });
//     } else {
//       throw new BadRequestException('Unknown user type');
//     }

//     return await query;
//   }

//   async newPayment(
//     payload: JWTPayload,
//     paymentInput: PaymentInputDto,
//     //@ts-ignore
//     images: Express.Multer.File[],
//   ) {
//     if (paymentInput.billing_period_from > paymentInput.billing_period_to) {
//       throw new BadRequestException(
//         'Invalid billing period, billing start date must be earlier than the end date',
//       );
//     }
//     if (payload.role !== userRole.tenant) {
//       throw new BadRequestException(
//         'Invalid request, only tenant can create a new payment',
//       );
//     }
//     await this.knex.transaction(async (txn) => {
//       const [{ payment_id }] = await txn('payment')
//         .insert({
//           ...paymentInput,
//           landlord_id: payload.id,
//           created_at: new Date(),
//           edited_at: new Date(),
//           tenant_id: null,
//         })
//         .returning('id as property_id');
//       let imagesData:
//         | Record<string, string | number>
//         | Record<string, string | number>[];
//       if (images.length > 0) {
//         imagesData = images.map((item) => ({
//           attachments: item.filename,
//           property_id,
//         }));
//       } else
//         imagesData = {
//           attachments: 'propertyDefault.jpeg',
//           property_id,
//         };

//       await txn('propertyAttachments').insert(imagesData);
//     });

//     return {};
//   }
//   async paymentEdit(
//     payload: JWTPayload,
//     paymentInput: PaymentInputDto,
//     id: number,
//   ) {
//     if (paymentInput.billing_period_from > paymentInput.billing_period_to) {
//       throw new BadRequestException(
//         'Invalid rental period, rental end date must be earlier than or equal to the start date',
//       );
//     }
//     let result = await this.knex('property')
//       .select('id', 'landlord_id')
//       .where({ id })
//       .first();

//     if (!result.id) {
//       throw new BadRequestException(
//         'Invalid property ID, this property does not exist',
//       );
//     }
//     if (result.landlord_id !== payload.id) {
//       throw new BadRequestException(
//         'Invalid request, you are not allowed to edit this information',
//       );
//     }

//     let tenant_id = parseInt(propertyInput.tenant_id);

//     if (!tenant_id) {
//       tenant_id = null;
//     }
//     result = await this.knex('user')
//       .select('id')
//       .where({ id: tenant_id })
//       .first();
//     if (!result && propertyInput.tenant_id.length > 0) {
//       throw new BadRequestException(
//         'Invalid request, this user does not exist',
//       );
//     }
//     result = await this.knex('property')
//       .update({ ...propertyInput, tenant_id: tenant_id, edited_at: new Date() })
//       .where({ id })
//       .returning('id');
//     result = await this.knex('property').select('*').where({ id });

//     return { tenant_id: propertyInput.tenant_id };
//   }
//   async propertyDelete(
//     payload: JWTPayload,

//     id: number,
//   ) {
//     let result = await this.knex('property')
//       .select('id', 'landlord_id')
//       .where({ id })
//       .first();

//     if (!result.id) {
//       throw new BadRequestException(
//         'Invalid property ID, this property does not exist',
//       );
//     }
//     if (result.landlord_id !== payload.id) {
//       throw new BadRequestException(
//         'Invalid request, you are not allowed to delete this information',
//       );
//     }
//     await this.knex.transaction(async (transaction) => {
//       let result = await transaction('event')
//         .select('id')
//         .where({ property_id: id });
//       if (result.length > 0) {
//         result = result.map((item) => {
//           return item.id;
//         });

//         await transaction('eventAttachments').whereIn('event_id', result).del();
//         await transaction('event').where({ property_id: id }).del();
//       }
//       await transaction('propertyAttachments').where({ property_id: id }).del();
//       await transaction('property').where({ id }).del();
//     });
//     console.log('del');
//     return {};
//   }
// }
=======
import { BadRequestException, Injectable } from '@nestjs/common';
import { mkdirSync } from 'fs';
import { IncomingMessage } from 'http';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { PaymentInputDto_id } from 'src/dto/post-payment.dto';
import { JWTPayload, userRole } from 'src/types';

@Injectable()
export class PaymentService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async paymentDetail(payload: JWTPayload, payment_id: number) {
    let thisPayment = await this.knex('payment')
      .select('landlord_id', 'tenant_id')
      .where({ id: payment_id })
      .first();
    if (!thisPayment) {
      throw new BadRequestException(
        'Invalid request, this payment does not exist',
      );
    }
    if (
      thisPayment.landlord_id !== payload.id &&
      thisPayment.tenant_id !== payload.id
    ) {
      throw new BadRequestException(
        'Invalid request, you are not authorized to access information of this payment',
      );
    }

    let result = await this.knex('payment')
      .select(
        'payment.id as id',

        this.knex.raw('ARRAY_AGG(attachments) as attachments'),
      )
      .innerJoin(
        'propertyAttachments',
        'property.id',
        'propertyAttachments.property_id',
      )
      .groupBy(
        'property.id',
        'title',
        'area',
        'district',
        'location',
        'street',
        'building',
        'block',
        'floor',
        'room',
        'rent',
        'tenant_id',
        'rental_start_at',
        'rental_end_at',
        'property.edited_at',
      )
      .where({ 'payment.id': payment_id })
      .first();

    return result;
  }

  async paymentList(payload: JWTPayload) {
    let query = this.knex('payment')
      .select(
        'payment.id as id',
        'title',
        'rent',
        'billing_period_from',
        'billing_period_to',
        'first_name',
        'last_name',
        this.knex.raw('ARRAY_AGG(attachments) as attachments'),
      )
      .innerJoin(
        'paymentAttachments',
        'payment.id',
        'paymentAttachments.payment_id',
      )
      .leftJoin('user', 'tenant_id', 'user.id')
      .groupBy(
        'payment.id',
        'title',
        'rent',
        'billing_period_from',
        'billing_period_to',
        'first_name',
        'last_name',
      );
    if (payload.role == userRole.landlord) {
      query = query.where({ landlord_id: payload.id });
    } else if (payload.role == userRole.tenant) {
      query = query.where({ tenant_id: payload.id });
    } else {
      throw new BadRequestException('Unknown user type');
    }

    return await query;
  }

  async newPayment(
    payload: JWTPayload,
    paymentInput: PaymentInputDto_id,
    //@ts-ignore
    images: Express.Multer.File[],
  ) {
    // if (paymentInput.billing_period_from > paymentInput.billing_period_to) {
    //   throw new BadRequestException(
    //     'Invalid billing period, billing start date must be earlier than the end date',
    //   );
    // }
    if (payload.role !== userRole.tenant) {
      throw new BadRequestException(
        'Invalid request, only tenant can create a new payment application',
      );
    }
    await this.knex.transaction(async (txn) => {
      //   console.log({ t: { title: paymentInput.title, tenant_id: payload.id } });
      //   let property_id = parseInt(paymentInput.property_id);
      //   let result = await this.knex('property')
      //     .select('id')
      //     .where({ title: paymentInput.title, tenant_id: payload.id });
      // .first();

      //   console.log(result);
      if (!paymentInput.title) {
        throw new BadRequestException(
          'Invalid property ID, this property does not exist',
        );
      }
      let { title, rent, ...newInput } = paymentInput;
      //   let property_id = parseInt(paymentInput.property_id);
      const [{ payment_id }] = await txn('payment')
        .insert({
          ...newInput,
          payer_id: payload.id,
          status: 'pending',
          created_by_id: payload.id,
          created_at: new Date(),
          property_id: paymentInput.title,
          confirmed_by_id: null,
          confirmed_at: null,
        })
        .returning('id as payment_id');
      let imagesData:
        | Record<string, string | number>
        | Record<string, string | number>[];
      if (images.length > 0) {
        imagesData = images.map((item) => ({
          attachments: item.filename,
          payment_id,
        }));
      } else
        imagesData = {
          attachments: 'paymentDefault.jpeg',
          payment_id,
        };

      await txn('paymentAttachments').insert(imagesData);
    });

    return {};
  }

  //   async paymentEdit(
  //     payload: JWTPayload,
  //     paymentInput: PaymentInputDto,
  //     id: number,
  //   ) {
  //     if (paymentInput.billing_period_from > paymentInput.billing_period_to) {
  //       throw new BadRequestException(
  //         'Invalid rental period, rental end date must be earlier than or equal to the start date',
  //       );
  //     }
  //     let result = await this.knex('property')
  //       .select('id', 'landlord_id')
  //       .where({ id })
  //       .first();

  //     if (!result.id) {
  //       throw new BadRequestException(
  //         'Invalid property ID, this property does not exist',
  //       );
  //     }
  //     if (result.landlord_id !== payload.id) {
  //       throw new BadRequestException(
  //         'Invalid request, you are not allowed to edit this information',
  //       );
  //     }

  //     let tenant_id = parseInt(paymentInput.tenant_id);

  //     if (!tenant_id) {
  //       tenant_id = null;
  //     }
  //     result = await this.knex('user')
  //       .select('id')
  //       .where({ id: tenant_id })
  //       .first();
  //     if (!result && paymentInput.tenant_id.length > 0) {
  //       throw new BadRequestException(
  //         'Invalid request, this user does not exist',
  //       );
  //     }
  //     result = await this.knex('property')
  //       .update({ ...paymentInput, tenant_id: tenant_id, edited_at: new Date() })
  //       .where({ id })
  //       .returning('id');
  //     result = await this.knex('property').select('*').where({ id });

  //     return { tenant_id: paymentInput.tenant_id };
  //   }

  //   async paymentyDelete(
  //     payload: JWTPayload,

  //     id: number,
  //   ) {
  //     let result = await this.knex('payment')
  //       .select('id', 'landlord_id')
  //       .where({ id })
  //       .first();

  //     if (!result.id) {
  //       throw new BadRequestException(
  //         'Invalid payment ID, this payment does not exist',
  //       );
  //     }
  //     if (result.landlord_id !== payload.id) {
  //       throw new BadRequestException(
  //         'Invalid request, you are not allowed to delete this information',
  //       );
  //     }
  //     await this.knex.transaction(async (transaction) => {
  //       let result = await transaction('event')
  //         .select('id')
  //         .where({ payment_id: id });
  //       if (result.length > 0) {
  //         result = result.map((item) => {
  //           return item.id;
  //         });

  //         await transaction('eventAttachments').whereIn('event_id', result).del();
  //         await transaction('event').where({ payment_id: id }).del();
  //       }
  //       await transaction('paymentAttachments').where({ payment_id: id }).del();
  //       await transaction('payment').where({ id }).del();
  //     });
  //     console.log('del');
  //     return {};
  //   }
}
>>>>>>> 214393992464d58d9c3f0ab35685260051b106de
