import { PartialType } from '@nestjs/mapped-types';
import { CompanyDTO } from 'src/db/repository/company.repository/company.repository.service';

export class UpdateCompanyDto extends PartialType(CompanyDTO) {}
