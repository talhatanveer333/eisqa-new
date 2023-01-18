import {
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCode, ResponseMessage } from '../../utils/enum';
import { Message } from './message.entity';


@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly MessageRepository: Repository<Message>,
  ) { }

  async findAll(): Promise<Message[]> {
    return await this.MessageRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    return await this.MessageRepository.findOne(id);
  }

  async create(Message: Message): Promise<Message> {
    return await this.MessageRepository.save(Message);
  }

  async update(id: number, Message: Message): Promise<Message> {
    await this.MessageRepository.update(id, Message);
    return await this.MessageRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.MessageRepository.delete(id);
  }
}
