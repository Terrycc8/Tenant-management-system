import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { EventInputDto } from 'src/dto/post-event.dto';
import { JWTPayload, PatchEventInput, userRole } from 'src/types';

@Injectable()
export class EventService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async newEvent(
    payload: JWTPayload,
    eventInput: EventInputDto,
    images: Express.Multer.File[],
  ) {
    // if (payload.role !== userRole.tenant) {
    //   throw new BadRequestException(
    //     'Invalid request, only tenant can create new event',
    //   );
    // }
    let id = eventInput.property_id;
    const { tenant_id, landlord_id } = await this.knex('property')
      .select('tenant_id', 'landlord_id')
      .where({ id })
      .first();

    // if (tenant_id !== payload.id) {
    //   throw new BadRequestException(
    //     'You are not allowed to create event of this property',
    //   );
    // }

    await this.knex.transaction(async (txn) => {
      const [{ event_id }] = await txn('event')
        .insert({
          ...eventInput,
          handled_by_id: landlord_id,
          status: 'pending',
          created_by_id: payload.id,
          created_at: new Date(),
        })
        .returning('id as event_id');

      let imagesData:
        | Record<string, string | number>
        | Record<string, string | number>[];
      if (images.length > 0) {
        imagesData = images.map((item) => ({
          attachments: item.filename,
          event_id,
        }));
      } else
        imagesData = {
          attachments: 'eventDefault.jpg',
          event_id,
        };
      await txn('eventAttachments').insert(imagesData);
    });

    return {};
  }

  async eventList(payload: JWTPayload, offset: number, page: number) {
    let query = await this.knex('event')
      .select(
        'event.id as id',
        'event.title as event_title',
        'type',
        'priority',
        'event.status',
        'reason as comment',
        'description',
        'property.title as property_title',
        this.knex.raw('ARRAY_AGG(attachments) as attachments'),
      )
      .innerJoin('eventAttachments', 'event.id', 'eventAttachments.event_id')
      .innerJoin('property', 'event.property_id', 'property.id')
      .innerJoin('user', 'handled_by_id', 'user.id')
      .groupBy(
        'event.id',
        'event.title',
        'type',
        'priority',
        'event.status',
        'reason',
        'description',
        'property.title',
      )
      .where({ created_by_id: payload.id })
      .orWhere({ handled_by_id: payload.id })
      .orderBy('event.created_at')
      .limit(offset)
      .offset(offset * (page - 1));
    // let total = await this.knex('event')
    //   .count('id')
    //   .where({ created_by_id: payload.id })
    //   .orWhere({ handled_by_id: payload.id })
    //   .first();

    return { result: query, totalItem: +query.length || 0 };
  }
  async patchEvent(
    patchEventInput: PatchEventInput,
    jwtPayload: JWTPayload,
    id: number,
  ) {
    const event = await this.knex('event')
      .select('id', 'handled_by_id', 'created_by_id', 'status')
      .where({ id })
      .first();

    if (!event) {
      throw new BadRequestException('This event id does not exist');
    }
    if (event.status !== 'pending') {
      throw new BadRequestException('This event has been closed');
    }
    if (
      event.handled_by_id !== jwtPayload.id &&
      event.created_by_id !== jwtPayload.id
    ) {
      throw new BadRequestException('You are not allowed to edit this event');
    }
    let status: string;
    if (jwtPayload.role == userRole.landlord) {
      if (patchEventInput.type == 'resolve') {
        status = 'resolved';
      } else if (patchEventInput.type == 'reject') {
        status = 'rejected';
      }
    } else if (jwtPayload.role == userRole.tenant) {
      if (patchEventInput.type == 'cancel') {
        status = 'cancelled';
      }
    } else {
      throw new BadRequestException('Invalid request');
    }
    const insertResult = await this.knex('event')
      .update({ status, reason: patchEventInput.comment })
      .where({ id })
      .returning('id');

    return {};
  }
}
