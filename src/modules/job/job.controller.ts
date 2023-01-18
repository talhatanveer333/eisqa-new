import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Job } from "./job.entity";
import { JobService } from "./job.service";

@Controller('jobs')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @Get()
    async findAll(): Promise<Job[]> {
        return this.jobService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Job> {
        return this.jobService.findOne(id);
    }

    @Post()
    async create(@Body() job: Job): Promise<Job> {
        return this.jobService.create(job);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() job: Job): Promise<Job> {
        return this.jobService.update(id, job);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.jobService.remove(id);
    }
}