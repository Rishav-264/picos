import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { CompanyRepositoryService } from './db/repository/company.repository/company.repository.service';
import { CompaniesModule } from './companies/companies.module';
import { BillingInfoModule } from './billing-info/billing-info.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, UsersModule, CompaniesModule, BillingInfoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, CompanyRepositoryService],
})
export class AppModule {}
