import {
  BadRequestException,
  Injectable,
<<<<<<< HEAD
  NotImplementedException,
} from '@nestjs/common';

=======
  UnauthorizedException,
} from '@nestjs/common';
>>>>>>> a6e939612c75f92de872bdbcc37c666a55d2e97c
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { LoginInputWithPasswordDto } from 'src/dto/post-login.dto';
import { SignUpInputWithPasswordDto } from 'src/dto/post-signup.dto';
import { comparePassword, hashPassword } from 'src/hash';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { JWTPayload, UserListOutput, userRole } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private mailService: MailService,
  ) {}

  async loginWithPassword({ email, password }: LoginInputWithPasswordDto) {
    let { id, hash, role } = await this.knex('user')
      .select({ id: 'id', hash: 'password_hash', role: 'user_type' })
      .where({ email })
      .first();

    if (!id) {
      throw new BadRequestException('Invalid email, this user does not exit');
    }
    let isCorrectPassword = await comparePassword({
      password,
      hash,
    });
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Incorrect password');
    }
    return { id, role };
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
    // await this.mailService.sendOPT(
    //   {
    //     email: sigUpInput.email,
    //     name: sigUpInput.first_name + sigUpInput.last_name,
    //   },
    //   '1',
    // );

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

  async users(payload: JWTPayload) {
    if (payload.role === 'landlord') {
      let result = await this.knex('property')
        .select('tenant_id as id')
        .where({ landlord_id: payload.id });

      result = result.map((item) => {
        return item.id;
      });
      let result1 = await this.knex('user')
        .select('id', 'avatar', 'first_name', 'last_name', 'status')
        .whereIn('id', result);

      return result1;
    } else if (payload.role === 'tenant') {
      let result = await this.knex('property')
        .select('landlord_id as id')
        .where({ tenant_id: payload.id });
      result = result.map((item) => {
        return item.id;
      });
      // console.log(result)
      let result1 = await this.knex('user')
        .select('id', 'avatar', 'first_name', 'last_name', 'status')
        .whereIn('id', result);
      return result1;
    }
  }

  async getContactList(user: JWTPayload) {
    let query = this.knex
      .from('user')
      .select(
        'user.id',
        'user.avatar',
        'user.first_name',
        'user.last_name',
        'user.status',
      );
    if (user.role === 'landlord') {
      query = query
        .innerJoin('property', 'property.tenant_id', 'user.id')
        .where('landlord_id', user.id);
    } else if (user.role === 'tenant') {
      query = query
        .innerJoin('property', 'property.landlord_id', 'user.id')
        .where('tenant_id', user.id);
    } else {
      throw new NotImplementedException('this api is not supported for admin');
    }
    let contacts = await query;
    return { contacts };
  }
}
