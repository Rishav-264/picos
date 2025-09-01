
import { 
  IsUUID, 
  IsString, 
  Length, 
  IsEnum, 
  IsEmail, 
  IsBoolean, 
  IsOptional
} from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserDto {
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
  mfa: boolean = true;

  @IsString()
  @Length(7, 15) // basic validation for phone numbers
  phone_number: string;
}

