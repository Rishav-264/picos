import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CompanyDTO {
  @IsNotEmpty()
  @IsString()
  business_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address_line1: string;

  @IsOptional()
  @IsString()
  address_line2: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 10) // Indian pincodes are 6 digits, but keeping a range
  pincode: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 15) // phone number length validation
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  fssai_license_number: string;

  @IsNotEmpty()
  @IsString()
  trade_name: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10) // Indian PAN is 10 characters
  pan: string;
}
