import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from './proposal.entity';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal])],
  exports: [ProposalService],
  providers: [ProposalService],
  controllers: [ProposalController]
})
export class ProposalModule { }
