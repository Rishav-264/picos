import { PG_CONNECTION } from 'src/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserEntity {
  id: string;
  company_id: string;
  outlet_id: string | null;
  name: string;
  role: UserRole;
  email: string;
  password: string;
  mfa: boolean;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
}

@Injectable()
export class UsersRepositoryService {
    constructor(@Inject(PG_CONNECTION) private conn: Pool) {}
    private GET_USERS = `
        SELECT * FROM rito.users
    `

    private GET_USER_BY_EMAIL = `
        SELECT * FROM rito.users
        WHERE email = $1
        LIMIT 1;
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
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const res = await this.conn.query<UserEntity>(this.CREATE_USER, [
    userDto.company_id,
    userDto.outlet_id ?? null,
    userDto.name,
    userDto.role,
    userDto.email,
    hashedPassword,
    userDto.mfa ?? null,
    userDto.phone_number
])
    return res.rows?.[0];
    }

    private readonly allowedFields = Object.keys(new UserEntity());

    async findOneByEmail(email: string) {
        const res = await this.conn.query(this.GET_USER_BY_EMAIL, [email]);
        return res.rows?.[0]
    }
}
