import { PartialType } from '@nestjs/mapped-types';
import { CompanyEntity } from 'src/db/repository/company.repository/company.repository.service';

export class UpdateCompanyDto extends PartialType(CompanyEntity) {}
