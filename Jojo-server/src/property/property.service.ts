import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { PropertyInputDto } from 'src/dto/post-property.dto';
import { JWTPayload, userRole } from 'src/types';

@Injectable()
export class PropertyService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async propertyDetail(payload: JWTPayload, property_id: number) {
    if (payload.role !== userRole.landlord) {
      throw new BadRequestException(
        'invalid request, this api is only for landlord',
      );
    }

    let owner = await this.knex('property')
      .select('landlord_id')
      .where({ id: property_id })
      .first();

    if (owner.landlord_id !== payload.id) {
      throw new BadRequestException(
        'invalid request, you are not authorized to access this property',
      );
    }

    let result = await this.knex('property')
      .select(
        'id',
        'title',
        'rent',
        'rental_start_at',
        'rental_end_at',
        'created_at',
      )
      .where({ id: property_id })
      .first();

    return result;
  }
  async propertyList(payload: JWTPayload) {
    let result;
    if (payload.role == userRole.landlord) {
      result = await this.knex('property')
        .select('id', 'title', 'rent', 'rental_start_at', 'rental_end_at')
        .where({ landlord_id: payload.id });
    }
    if (payload.role == userRole.tenant) {
      result = await this.knex('property')
        .select('id', 'title', 'rent', 'rental_start_at', 'rental_end_at')
        .where({ tenant_id: payload.id });
    }
    return result;
  }
  async newProperty(payload: JWTPayload, propertyInput: PropertyInputDto) {
    if (propertyInput.rental_start_at > propertyInput.rental_end_at) {
      throw new BadRequestException(
        'invalid rental period, end date must be less than or equal start date',
      );
    }
    let result: number[];

    result = await this.knex('property')
      .insert({
        ...propertyInput,
        landlord_id: payload.id,
        created_at: new Date(),
        tenant_id: null,
      })
      .returning('id');

    return { id: result[0] };
  }
}
