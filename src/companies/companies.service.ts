import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepositoryService } from '../db/repository/company.repository/company.repository.service';
import { BillingInfoRepositoryService } from 'src/db/repository/billing_info.repository/billing_info.repository.service';
import { UsersRepositoryService } from 'src/db/repository/users.repository/users.repository.service';

@Injectable()
export class CompaniesService {

  constructor(private readonly companyRepository: CompanyRepositoryService, private readonly billingInfoRepository: BillingInfoRepositoryService, private readonly userInfoRepository: UsersRepositoryService) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const company = createCompanyDto.company;
    const billingInfo = createCompanyDto.billingInfo;
    const user = createCompanyDto.user;


    //company creation
    const createdRow = await this.companyRepository.create(company);
    const company_id = createdRow.id;

    //billingInfo creation
    billingInfo.company_id = company_id;
    const createdBillInfo = await this.billingInfoRepository.create(billingInfo);

    //user creation
    user.company_id = company_id;
    const createdUser = await this.userInfoRepository.create(user);

    return {company: createdRow, billingInfo: createdBillInfo, user: createdUser};
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
