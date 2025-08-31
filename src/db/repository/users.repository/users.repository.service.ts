import { PG_CONNECTION } from 'src/constants';
import { Inject, Injectable } from '@nestjs/common';
import { IsUUID, IsString, IsEmail, IsEnum, IsBoolean, IsOptional, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { Pool } from 'pg';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsUUID()
  company_id: string;

  @IsOptional()
  @IsUUID()
  outlet_id: string;

  @IsString()
  @Length(2, 100)
  name: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100) // simple rule for password
  password: string;

  @IsOptional()
  @IsBoolean()
  mfa?: boolean = true;

  @IsString()
  @Length(7, 15) // basic validation for phone numbers
  phone_number: string;

  @IsOptional()
  @Type(() => Date)
  created_at?: Date;

  @IsOptional()
  @Type(() => Date)
  updated_at?: Date;
}


@Injectable()
export class UsersRepositoryService {
    constructor(@Inject(PG_CONNECTION) private conn: Pool) {}
    private GET_USERS = `
        SELECT * FROM rito.users
    `
    private CREATE_USER = `
    INSERT INTO rito.users (
        company_id,
        outlet_id,
        name,
        role,
        email,
        password,
        mfa,
        phone_number
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
    ) RETURNING *;
`;

    async findAll() {
        const res = await this.conn.query(this.GET_USERS);
        return res;
    }

    async create(userDto:UserDTO) {
        const res = await this.conn.query(this.CREATE_USER, [
    userDto.company_id,
    null,
    userDto.name,
    userDto.role,
    userDto.email,
    userDto.password,
    userDto.mfa,
    userDto.phone_number
])
    return res.rows?.[0];
    }
}
