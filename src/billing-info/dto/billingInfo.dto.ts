export class CreateBillingInfoDto {}
import { IsUUID, IsEnum, IsOptional, IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export enum BillingType {
  COMPANY = 'COMPANY',
  OUTLET = 'OUTLET',
}

export class BillingInfoDTO {
  @IsNotEmpty()
  @IsUUID()
  company_id: string;

  @IsEnum(BillingType)
  billing_type: BillingType;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9A-Z]{15}$/, { message: 'Invalid GSTIN format' })
  gstin: string;

  @IsString()
  @IsNotEmpty()
  pan: string;

  @IsString()
  @IsNotEmpty()
  billing_address_line1: string;

  @IsOptional()
  @IsString()
  billing_address_line2: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'Pincode must be 6 digits' })
  pincode: string;

  @IsString()
  @IsNotEmpty()
  state_code: string;

  @IsNotEmpty()
  @IsString()
  bank_account_number: string;

  @IsNotEmpty()
  @IsString()
  bank_ifsc: string;

  @IsNotEmpty()
  @IsString()
  invoice_prefix: string;
}