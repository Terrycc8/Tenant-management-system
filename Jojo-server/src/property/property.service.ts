import { BadRequestException, Injectable } from '@nestjs/common';
import { mkdirSync } from 'fs';
import { IncomingMessage } from 'http';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { PropertyInputDto } from 'src/dto/post-property.dto';
import { JWTPayload, userRole } from 'src/types';

@Injectable()
export class PropertyService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async propertyDetail(payload: JWTPayload, property_id: number) {
    let owner = await this.knex('property')
      .select('landlord_id', 'tenant_id')
      .where({ id: property_id })
      .first();

    if (owner.landlord_id !== payload.id && owner.tenant_id !== payload.id) {
      throw new BadRequestException(
        'invalid request, you are not authorized to access information of this property',
      );
    }

    let result = await this.knex('property')
      .select(
        'property.id as id',
        'title ',
        'area ',
        'district ',
        'location ',
        'street ',
        'building ',
        'block',
        'floor ',
        'room ',
        'rent  ',
        'tenant_id  ',
        'rental_start_at ',
        'rental_end_at',
        'property.edited_at as edited_at',
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
      .where({ 'property.id': property_id })
      .first();

    return result;
  }
  async propertyList(payload: JWTPayload) {
    let query = this.knex('property')
      .select(
        'property.id',
        'title',
        'rent',
        'rental_start_at',
        'rental_end_at',
        'tenant_id',
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
        'rent',
        'rental_start_at',
        'rental_end_at',
        'tenant_id',
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
  async newProperty(
    payload: JWTPayload,
    propertyInput: PropertyInputDto,
    images: Express.Multer.File[],
  ) {
    if (propertyInput.rental_start_at > propertyInput.rental_end_at) {
      throw new BadRequestException(
        'Invalid rental period, rental end date must be earlier than or equal to the start date',
      );
    }

    let [{ id }] = await this.knex('property')
      .insert({
        ...propertyInput,
        landlord_id: payload.id,
        created_at: new Date(),
        edited_at: new Date(),
        tenant_id: null,
      })
      .returning('id');
    let imagesData:
      | Record<string, string | number>
      | Record<string, string | number>[];
    if (images.length > 0) {
      imagesData = images.map((item) => ({
        attachments: item.filename,
        property_id: id,
      }));
    } else
      imagesData = {
        attachments: 'propertyDefault.jpeg',
        property_id: id,
      };

    await this.knex('propertyAttachments').insert(imagesData).returning('id');

    return {};
  }
  async propertyEdit(
    payload: JWTPayload,
    propertyInput: PropertyInputDto,
    id: number,
  ) {
    if (propertyInput.rental_start_at > propertyInput.rental_end_at) {
      throw new BadRequestException(
        'Invalid rental period, rental end date must be earlier than or equal to the start date',
      );
    }
    let result = await this.knex('property')
      .select('id', 'landlord_id')
      .where({ id })
      .first();

    if (!result.id) {
      throw new BadRequestException(
        'Invalid property ID, this property does not exist',
      );
    }
    if (result.landlord_id !== payload.id) {
      throw new BadRequestException(
        'Invalid request, you are not allowed to edit this information',
      );
    }

    let tenant_id = parseInt(propertyInput.tenant_id);

    if (!tenant_id) {
      tenant_id = null;
    }
    result = await this.knex('user')
      .select('id')
      .where({ id: tenant_id })
      .first();
    if (!result && propertyInput.tenant_id.length > 0) {
      throw new BadRequestException(
        'Invalid request, this user does not exist',
      );
    }
    result = await this.knex('property')
      .update({ ...propertyInput, tenant_id: tenant_id, edited_at: new Date() })
      .where({ id })
      .returning('id');
    result = await this.knex('property').select('*').where({ id });

    return {};
  }
}
