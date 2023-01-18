import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { JobReview } from "./job_review.entity";
import { JobReviewService } from "./job_review.service";

@Controller('JobReviews')
export class JobReviewController {
    constructor(private readonly JobReviewService: JobReviewService) { }

    @Get()
    async findAll(): Promise<JobReview[]> {
        return this.JobReviewService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<JobReview> {
        return this.JobReviewService.findOne(id);
    }
    @Post()
    async create(@Body() JobReview: JobReview): Promise<JobReview> {
        return this.JobReviewService.create(JobReview);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() JobReview: JobReview): Promise<JobReview> {
        return this.JobReviewService.update(id, JobReview);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.JobReviewService.remove(id);
    }
}