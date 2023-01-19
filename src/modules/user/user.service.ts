import {
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hash } from '../../utils/Hash';
import { RegisterPayload } from 'modules/auth';
import { Repository } from 'typeorm';
import { ResponseCode, ResponseMessage } from '../../utils/enum';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async create(user: User): Promise<User> {
    user.password = await Hash.make(user.password);
    return await this.userRepository.save(user);
  }

  async update(email: string, user: User): Promise<User> {
    await this.userRepository.update({ email }, user);
    return await this.userRepository.findOne({ email });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

}
