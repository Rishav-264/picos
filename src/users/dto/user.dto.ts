
import { 
  IsUUID, 
  IsString, 
  Length, 
  IsEnum, 
  IsEmail, 
  IsBoolean, 
  IsOptional,
  IsNotEmpty
} from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserDto {
  @IsNotEmpty()
  @IsUUID()
  company_id: string;

  @IsOptional()
  @IsUUID()
  outlet_id: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100) // simple rule for password
  password: string;

  @IsOptional()
  @IsBoolean()
  mfa: boolean = true;

  @IsString()
  @IsNotEmpty()
  @Length(7, 15) // basic validation for phone numbers
  phone_number: string;
}

