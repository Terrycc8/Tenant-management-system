import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { IDParamDto } from 'src/dto/IDParams';
import { AddTenantInputDto } from 'src/dto/patch-tenant.dto';
import { PatchUserInputDto } from 'src/dto/patch-user.dto';
import {
  LoginInputWithFaceBookDto,
  LoginInputWithPasswordDto,
} from 'src/dto/post-login.dto';
import { SignUpInputWithPasswordDto } from 'src/dto/post-signup.dto';
import { env } from 'src/env';
import { comparePassword, hashPassword } from 'src/hash';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { JWTPayload, LoginFBInput, UserListOutput, userRole } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private mailService: MailService,
  ) {}

  async loginWithPassword({ email, password }: LoginInputWithPasswordDto) {
    let result = await this.knex('user')
      .select({
        id: 'id',
        hash: 'password_hash',
        role: 'user_type',
        verified: 'verified',
      })
      .where({ email })
      .first();

    if (!result) {
      throw new BadRequestException('Invalid email, this user does not exit');
    }
    let isCorrectPassword = await comparePassword({
      password,
      hash: result.hash,
    });
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Incorrect password');
    }
    if (!result.verified) {
      throw new UnauthorizedException('You have not activated your account');
    }

    return { id: result.id, role: result.role, verified: result.verified };
  }
  async patchUser(
    jwtPayLoad: JWTPayload,
    patchUserInput: PatchUserInputDto,
    params: string,
    image: Express.Multer.File[],
  ) {
    if (jwtPayLoad.id !== parseInt(params)) {
      throw new BadRequestException(
        'You are not allowed to edit profile of this user',
      );
    }
    if (!jwtPayLoad.verified) {
      throw new UnauthorizedException(
        'Your account is not activated, please check registered email',
      );
    }
    let filename: string | null;

    if (image.length == 1) {
      filename = image[0].filename;
    } else filename = null;

    await this.knex('user')
      .update({
        last_name: patchUserInput.last_name,
        first_name: patchUserInput.first_name,
        avatar: filename,
      })
      .where({ id: params });
    const result = await this.knex('user')
      .select('*')
      .where({ id: params })
      .first();

    return {};
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

    let token = randomUUID().replace('-', '');

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
        avatar: null,
        token,
        verified: false,
        issued_at: new Date(),
      })
      .returning('id');
    await this.mailService.sendOPT(
      {
        email: sigUpInput.email,
        name: sigUpInput.first_name + sigUpInput.last_name,
      },
      { token, id: userID[0].id },
    );
    return { id: userID[0].id, role: sigUpInput.user_type, verified: false };
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
    if (!jwtPayLoad.verified) {
      throw new UnauthorizedException(
        'Your account is not activated, please check registered email',
      );
    }
    const profile = await this.knex('user')
      .select(
        'id',
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
  async getTenants(jwtPayLoad: JWTPayload, offset: number, page: number) {
    if (!jwtPayLoad.verified) {
      throw new UnauthorizedException(
        'Your account is not activated, please check registered email',
      );
    }
    if (jwtPayLoad.role == userRole.tenant) {
      throw new UnauthorizedException('This api is only for landlord');
    }

    const tenants = await this.knex('property')
      .select(
        'tenant_id',
        'first_name',
        'last_name',
        'email',
        'avatar',
        'title',
      )
      .innerJoin('user', 'property.tenant_id', 'user.id')
      .where({ landlord_id: jwtPayLoad.id })
      .orderBy('first_name')
      .limit(offset)
      .offset(offset * (page - 1));

    return { result: tenants, totalItem: +tenants.length || 0 };
  }
  async getAllTenants(jwtPayLoad: JWTPayload, searchText: string) {
    if (!jwtPayLoad.verified) {
      throw new UnauthorizedException(
        'Your account is not activated, please check registered email',
      );
    }
    if (jwtPayLoad.role == userRole.tenant) {
      throw new UnauthorizedException('This api is only for landlord');
    }

    const tenants = await this.knex('user')
      .select('id as tenant_id', 'avatar', 'first_name', 'last_name')
      .where({ user_type: userRole.tenant })
      .where({ verified: true })
      .andWhere(function () {
        this.orWhereILike('first_name', `%${searchText}%`)
          .orWhereILike('last_name', `%${searchText}%`)
          .orWhereLike('email', `%${searchText}%`);
      });

    return tenants;
  }
  async activate(token: string, id: number) {
    let user = await this.knex('user')
      .select('token', 'verified', 'issued_at', 'user_type')
      .where({ id })
      .first();
    if (!user) {
      throw new BadRequestException('This user does not exist');
    }
    if (await this.statusVerified(id)) {
      throw new BadRequestException('Your account has been verified.');
    }
    if (user.token !== token) {
      throw new BadRequestException('Invalid token');
    }

    let valid_time_5_mins_in_ms = 5 * 60 * 1000;
    let time_diff = new Date().getTime() - user.issued_at.getTime;
    if (time_diff > valid_time_5_mins_in_ms) {
      throw new BadRequestException('Token expired');
    }
    await this.knex('user').update({ verified: true }).where({ id });
    return { id, role: user.user_type, verified: true };
  }
  async loginWithFaceBook(loginFBInput: LoginInputWithFaceBookDto) {
    let params = new URLSearchParams({
      fields: 'email,first_name,last_name',
      access_token: loginFBInput.accessToken,
    });

    let res = await fetch('http://graph.facebook.com/me?' + params);
    let json = await res.json();
    let email = json.email;

    if (typeof email !== 'string' || !email) {
      throw new BadGatewayException('Failed to get user email');
    }

    let user = await this.knex('user')
      .select('id', 'verified', 'user_type')
      .where({ email })
      .first();

    if (!user) {
      let token = randomUUID().replace('-', '');
      user = await this.knex('user')
        .insert({
          first_name: json.first_name,
          last_name: json.last_name,
          email,
          user_type: loginFBInput.user_type,
          password_hash: await hashPassword(token),
          registered_at: new Date(),
          last_login_time: new Date(),
          status: 'Online',
          status_update_time: new Date(),
          avatar: null,
          token,
          verified: true,
          issued_at: new Date(),
        })
        .returning('id');
    }

    return {
      id: user[0].id,
      role: user.user_type || loginFBInput.user_type,
      verified: true,
    };
  }
  async statusVerified(id: number) {
    let result = await this.knex('user')
      .select('verified')
      .where({ id })
      .first();
    if (!result) {
      throw new BadRequestException('This user does not exist');
    }
    console.log(result.verified);
    return result.verified;
  }

  async addTenant(jwtPayLoad: JWTPayload, input: AddTenantInputDto) {
    if (!jwtPayLoad.verified) {
      throw new UnauthorizedException(
        'Your account is not activated, please check registered email',
      );
    }
    const result = await this.knex('property')
      .select('tenant_id', 'landlord_id')
      .where({ id: input.property_id })
      .first();
    if (!result) {
      throw new BadRequestException('This property does not exist');
    }
    if (result.landlord_id !== jwtPayLoad.id) {
      throw new UnauthorizedException(
        'You are not allowed to add tenant to this property',
      );
    }
    await this.knex('property')
      .update({ tenant_id: input.tenant_id })
      .where({ id: input.property_id });

    return {};
  }
}
