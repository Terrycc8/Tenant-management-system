import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { EventInputDto } from 'src/dto/post-event.dto';
import { JWTPayload, userRole } from 'src/types';

@Injectable()
export class EventService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async newEvent(
    payload: JWTPayload,
    eventInput: EventInputDto,
    images: Express.Multer.File[],
  ) {
    if (payload.role !== userRole.tenant) {
      throw new BadRequestException(
        'Invalid request, only tenant can create new event',
      );
    }
    let id = eventInput.property_id;
    const { handled_by_id } = await this.knex('property')
      .select('landlord_id as handled_by_id')
      .where({ id })
      .first();

    if (handled_by_id == null) {
      throw new BadRequestException(
        'No tenant is associated with this property yet',
      );
    }

    await this.knex.transaction(async (txn) => {
      const [{ event_id }] = await txn('event')
        .insert({
          ...eventInput,
          handled_by_id,
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
          attachments: 'eventDefault.jpeg',
          event_id,
        };
      await txn('eventAttachments').insert(imagesData);
    });

    return {};
  }

  async eventList(payload: JWTPayload) {
    let query = this.knex('event')
      .select(
        'event.id as id',
        'title',
        'type',
        'priority',
        'event.status',
        this.knex.raw('ARRAY_AGG(attachments) as attachments'),
      )
      .innerJoin('eventAttachments', 'event.id', 'eventAttachments.event_id')
      .innerJoin('user', 'handled_by_id', 'user.id')
      .groupBy('event.id', 'title', 'type', 'priority', 'event.status')
      .where({ created_by_id: payload.id })
      .orWhere({ handled_by_id: payload.id });

    return await query;
  }
}
