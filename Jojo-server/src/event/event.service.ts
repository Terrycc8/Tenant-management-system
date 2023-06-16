import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { EventInputDto } from 'src/dto/post-event.dto';
import { JWTPayload, userRole } from 'src/types';

@Injectable()
export class EventService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async newEvent(payload: JWTPayload, eventInput: EventInputDto) {
    let result: number[];
    let handler;
    if (payload.role == userRole.landlord) {
      handler = await this.knex('event')
        .select('tenant_id')
        .where({ id: eventInput.property_id })
        .first();
    } else if (payload.role == userRole.tenant) {
      handler = await this.knex('event')
        .select('landlord_id' as 'id')
        .where({ property_id: eventInput.property_id })
        .first();
    }
    if (handler.tenant_id == null) {
      throw new BadRequestException(
        'No tenant is associated with this property yet',
      );
    }
    result = await this.knex('event')
      .insert({
        ...eventInput,
        handled_by_id: handler.id,
        status: 'pending',
        created_by_id: payload.id,
        created_at: new Date(),
      })
      .returning('id');
    return { id: result[0] };
  }

  async eventList(payload: JWTPayload) {
    return;
  }
}
