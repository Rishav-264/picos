import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepositoryService } from '../db/repository/users.repository/users.repository.service';


@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepositoryService) {}
  create(createUserDto: CreateUserDto) {
    
    return 'This action adds a new user';
  }

  async findAll() {
    const res = await this.userRepository.findAll();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string) {
    const res = await this.userRepository.findOneByEmail(email);
    return res;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
