import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobReview } from './job_review.entity';
import { JobReviewService as JobReviewService } from './job_review.service';
import { JobReviewController } from './job_review.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobReview])],
  exports: [JobReviewService],
  providers: [JobReviewService],
  controllers: [JobReviewController]
})
export class JobReviewModule { }
