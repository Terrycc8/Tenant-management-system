import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { PropertyInputDto } from 'src/dto/post-property.dto';

@Injectable()
export class PropertyService {
    constructor(@InjectModel() private readonly knex: Knex) { }
    async newProperty(payload: {
        id: number;
        role: string;
        propertyInput: PropertyInputDto;
    }) {
        const { id, role, propertyInput } = payload;
        if (propertyInput.rental_start_at > propertyInput.rental_end_at) {
            throw new BadRequestException(
                'invalid rental period, end date must be less than or equal start date',
            );
        }

        await this.knex('property').insert({ propertyInput });

        return {};
    }
}
