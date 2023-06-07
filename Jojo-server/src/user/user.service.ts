import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { LoginInputWithPasswordDto } from 'src/dto/post-login.dto';
import { SignUpInputWithPasswordDto } from 'src/dto/post-signup.dto';
import { comparePassword, hashPassword } from 'src/hash';

@Injectable()
export class UserService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async loginWithPassword(loginInput: LoginInputWithPasswordDto) {
    // let user = await this.knex('user')
    //   .select({ id: 'id', password_hash: 'password_hash' })
    //   .where({ email: loginInput.email });
    // if (!user) {
    //   throw new BadRequestException('Invalid email, this user does not exit');
    // }
    // if(comparePassword(loginInput.password,user.password_hash)){}
    return { token: '123' };
  }
  async signUp(sigUpInput: SignUpInputWithPasswordDto) {
    let id = await this.knex('user')
      .select('id')
      .where({ email: sigUpInput.email });
    if (id) {
      throw new BadRequestException(
        'Invalid email, this email has been registered',
      );
    }
    await this.knex('user').insert({
      ...sigUpInput,
      password_hash: hashPassword(sigUpInput.password),
      registered_at: Date.now(),
      last_login_time: Date.now(),
      status: 'Online',
      status_update_time: Date.now(),
      avatar: null,
    });

    return { token: '123' };
  }
}
