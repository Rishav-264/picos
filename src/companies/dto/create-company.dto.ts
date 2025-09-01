import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { BillingInfoDTO } from "../../billing-info/dto/billingInfo.dto";
import { CompanyDTO } from "./company.dto";
import { UserDto } from "src/users/dto/user.dto";

export class CreateCompanyDto {
  @ValidateNested()
  @Type(() => CompanyDTO)
  company: CompanyDTO;

  @ValidateNested()
  @Type(() => BillingInfoDTO)
  billingInfo: BillingInfoDTO;

  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
