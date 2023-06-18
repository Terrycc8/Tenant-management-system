import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { JWTPayload, userRole } from 'src/types';

@Injectable()
export class IndexService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  async getHomePageInfo(jwtPayload: JWTPayload) {
    const name = await this.knex('user')
      .select('first_name as name')
      .where({ id: jwtPayload.id })
      .first();
    if (!name) {
      throw new BadRequestException('This user does not exist!');
    }
    if (jwtPayload.role !== userRole.landlord) {
      throw new BadRequestException('This api is only for landlord');
    }
    let properties = await this.knex('property')
      .select('id')
      .where({ landlord_id: jwtPayload.id });

    if (properties.length == 0) {
      return { name: name.name, label: [], data: [] };
    }

    properties = properties.map((item) => {
      return item.id;
    });

    const info = await this.knex('event')
      .select('type')
      .count('type')
      .whereRaw(`EXTRACT(MONTH FROM created_at at time zone 'CCT')=?`, [
        new Date().getMonth() + 1,
      ])
      .andWhereRaw(`EXTRACT(Year FROM created_at at time zone 'CCT')=?`, [
        new Date().getFullYear(),
      ])
      .whereIn('property_id', properties)
      .groupBy('type');
    const label = info.map(
      (item) => item.type[0].toUpperCase() + item.type.slice(1),
    );
    const data = info.map((item) => item.count);

    return { name: name.name, label, data };
  }
}
