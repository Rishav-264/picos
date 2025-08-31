import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { BillingInfoDTO } from "src/db/repository/billing_info.repository/billing_info.repository.service";
import { CompanyDTO } from "src/db/repository/company.repository/company.repository.service";
import { UserDTO } from "src/db/repository/users.repository/users.repository.service";

export class CreateCompanyDto {
  @ValidateNested()
  @Type(() => CompanyDTO)
  company: CompanyDTO;

  @ValidateNested()
  @Type(() => BillingInfoDTO)
  billingInfo: BillingInfoDTO;

  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;
}
