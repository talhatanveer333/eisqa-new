import {
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCode, ResponseMessage } from '../../utils/enum';
import { Proposal } from './proposal.entity';


@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
  ) { }
  async findAll(): Promise<Proposal[]> {
    return await this.proposalRepository.find();
  }

  async findOne(id: number): Promise<Proposal> {
    return await this.proposalRepository.findOne(id);
  }

  async create(proposal: Proposal): Promise<Proposal> {
    return await this.proposalRepository.save(proposal);
  }

  async update(id: number, proposal: Proposal): Promise<Proposal> {
    await this.proposalRepository.update(id, proposal);
    return await this.proposalRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.proposalRepository.delete(id);
  }

}
