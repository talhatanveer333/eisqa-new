import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth';
import { CommonModule } from './../common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobReviewModule } from 'modules/job_review/job_review.module';
import { MessageModule } from 'modules/message/message.module';
import { MilestoneModule } from 'modules/milestone/milestone.module';
import { ProposalModule } from 'modules/proposal/proposal.module';
import { JobModule } from 'modules/job/job.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return await AppService.createConnection();
      },
    }),
    ConfigModule.forRoot({
      envFilePath: [AppService.envConfiguration()],
    }),
    AuthModule,
    CommonModule,
    JobModule,
    JobReviewModule,
    MessageModule,
    MilestoneModule,
    ProposalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
