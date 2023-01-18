import {
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCode, ResponseMessage } from '../../utils/enum';
import { Job } from './job.entity';


@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) { }
  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find();
  }

  async findOne(id: number): Promise<Job> {
    return await this.jobRepository.findOne(id);
  }

  async create(job: Job): Promise<Job> {
    return await this.jobRepository.save(job);
  }

  async update(id: number, job: Job): Promise<Job> {
    await this.jobRepository.update(id, job);
    return await this.jobRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.jobRepository.delete(id);
  }

}
