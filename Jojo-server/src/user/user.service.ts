import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { LoginInputWithPasswordDto } from 'src/dto/post-login.dto';
import { SignUpInputWithPasswordDto } from 'src/dto/post-signup.dto';
import { comparePassword, hashPassword } from 'src/hash';
import { JWTPayload } from 'src/types';

@Injectable()
export class UserService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async loginWithPassword({ email, password }: LoginInputWithPasswordDto) {
    let { id, hash, role } = await this.knex('user')
      .select({ id: 'id', hash: 'password_hash', role: 'user_type' })
      .where({ email: email })
      .first();

    if (!id) {
      throw new BadRequestException('Invalid email, this user does not exit');
    }
    let isCorrectPassword = await comparePassword({
      password,
      hash,
    });

    return { isCorrectPassword, jwtPayload: { id, role } };
  }
  async signUp(sigUpInput: SignUpInputWithPasswordDto): Promise<JWTPayload> {
    let user = await this.knex('user')
      .select('id')
      .where({ email: sigUpInput.email })
      .first();

    if (user) {
      throw new BadRequestException(
        'Invalid email, this email has been registered',
      );
    }

    let userID: number = await this.knex('user')
      .insert({
        first_name: sigUpInput.first_name,
        last_name: sigUpInput.last_name,
        email: sigUpInput.email,
        user_type: sigUpInput.user_type,
        password_hash: await hashPassword(sigUpInput.password),
        registered_at: new Date(),
        last_login_time: new Date(),
        status: 'Online',
        status_update_time: new Date(),
        avatar: '',
      })
      .returning('id');

    return { id: userID[0].id, role: sigUpInput.user_type };
  }
}
