import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { LoginInputDto } from 'src/dto/post-login.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async login(loginInput: LoginInputDto) {
    await this.knex.schema.dropTable('users');
    console.log('success');
    return {};
  }
}
