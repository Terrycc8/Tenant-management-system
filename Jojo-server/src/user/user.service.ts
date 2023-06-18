import {
  BadRequestException,
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
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
  async getProfile(jwtPayLoad: JWTPayload) {
    const profile = await this.knex('user')
      .select(
        'email',
        'last_name',
        'first_name',
        'avatar',
        'registered_at',
        'user_type',
        'last_login_time',
      )
      .where({ id: jwtPayLoad.id })
      .first();

    return profile;
  }
  async deleteAccount(jwtPayLoad: JWTPayload) {
    await this.knex.transaction(async (txn) => {
      if (jwtPayLoad.role == userRole.tenant) {
        let events = await txn('event')
          .select('id')
          .where({ created_by_id: jwtPayLoad.id });
        if (events.length > 0) {
          events = events.map((item) => {
            return item.id;
          });
          await txn('eventAttachments').whereIn('event_id', events).del();
        }
        await txn('event').where({ created_by_id: jwtPayLoad.id }).del();
      }
      if (jwtPayLoad.role == userRole.landlord) {
        let properties = await txn('property')
          .select('id')
          .where({ landlord_id: jwtPayLoad.id });
        if (properties.length > 0) {
          properties = properties.map((item) => {
            return item.id;
          });
          let events = await txn('event')
            .select('id')
            .whereIn('property_id', properties);
          if (events.length > 0) {
            events = events.map((item) => {
              return item.id;
            });
            await txn('eventAttachments').whereIn('event_id', events).del();
          }
          await txn('event').whereIn('property_id', properties).del();
        }
        await txn('propertyAttachments')
          .whereIn('property_id', properties)
          .del();
        await txn('property').where({ landlord_id: jwtPayLoad.id }).del();
      }
      await txn('user').where({ id: jwtPayLoad.id }).del();
    });

    return {};
  }
  async getTenants(jwtPayLoad: JWTPayload) {
    if (jwtPayLoad.role == userRole.tenant) {
      throw new BadRequestException('This api is only for landlord');
    }
    const result = await this.knex('property')
      .select('id')
      .where({ landlord_id: jwtPayLoad.id });
    if (result.length <= 0) {
      return [];
    }
    result.map((property) => {
      return property.id;
    });
    const events = await this.knex('event')
      .select('id')
      .whereIn('property_id', result)
      .orderBy('event.created_at')
      .limit(5);
    return events;
  }
}
