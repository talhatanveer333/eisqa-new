import {
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCode, ResponseMessage } from '../../utils/enum';
import { Milestone } from './milestone.entity';


@Injectable()
export class MilestoneService {
  constructor(
    @InjectRepository(Milestone)
    private readonly milestoneRepository: Repository<Milestone>,
  ) { }
  async findAll(): Promise<Milestone[]> {
    return await this.milestoneRepository.find();
  }

  async findOne(id: number): Promise<Milestone> {
    return await this.milestoneRepository.findOne(id);
  }

  async create(milestone: Milestone): Promise<Milestone> {
    return await this.milestoneRepository.save(milestone);
  }

  async update(id: number, milestone: Milestone): Promise<Milestone> {
    await this.milestoneRepository.update(id, milestone);
    return await this.milestoneRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.milestoneRepository.delete(id);
  }

}
