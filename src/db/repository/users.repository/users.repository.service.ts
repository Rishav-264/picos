import { PG_CONNECTION } from 'src/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { 
  IsUUID, 
  IsString, 
  Length, 
  IsEnum, 
  IsEmail, 
  IsBoolean, 
  IsNotEmpty, 
  IsDate, 
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserEntity {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  company_id: string;

  @IsUUID()
  @IsNotEmpty()
  outlet_id: string;

  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  name: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(6, 100) // simple rule for password
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsBoolean()
  mfa: boolean;

  @IsString()
  @Length(7, 15) // basic validation for phone numbers
  @IsNotEmpty()
  phone_number: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  updated_at: Date;
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

    async create(userDto: Omit<UserEntity, 'id' | 'created_at' | 'updated_at'>) {
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
