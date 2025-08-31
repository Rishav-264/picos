import { Module } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { Pool } from 'pg';
import { UsersRepositoryService } from './repository/users.repository/users.repository.service';
import { CompanyRepositoryService } from './repository/company.repository/company.repository.service';
import { BillingInfoRepositoryService } from './repository/billing_info.repository/billing_info.repository.service';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'root',
    host: 'localhost',
    database: 'rito',
    // password: null,
    port: 26257,
  }),
};

@Module({
    providers: [dbProvider, UsersRepositoryService, CompanyRepositoryService, BillingInfoRepositoryService],
    exports: [dbProvider, UsersRepositoryService, CompanyRepositoryService, BillingInfoRepositoryService]
})
export class DbModule {}
