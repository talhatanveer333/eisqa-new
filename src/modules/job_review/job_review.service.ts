import {
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCode, ResponseMessage } from '../../utils/enum';
import { JobReview } from './job_review.entity';


@Injectable()
export class JobReviewService {
  constructor(
    @InjectRepository(JobReview)
    private readonly jobReviewRepository: Repository<JobReview>,
  ) { }

  async findAll(): Promise<JobReview[]> {
    return await this.jobReviewRepository.find();
  }

  async findOne(id: number): Promise<JobReview> {
    return await this.jobReviewRepository.findOne(id);
  }

  async create(JobReview: JobReview): Promise<JobReview> {
    return await this.jobReviewRepository.save(JobReview);
  }

  async update(id: number, JobReview: JobReview): Promise<JobReview> {
    await this.jobReviewRepository.update(id, JobReview);
    return await this.jobReviewRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.jobReviewRepository.delete(id);
  }


}
