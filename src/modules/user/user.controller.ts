import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { JobService } from '../job/job.service';
import { Job } from '../job/job.entity';
import { ProposalService } from '../proposal/proposal.service';
import { Proposal } from '../proposal/proposal.entity';
import { JobReviewService } from '../job_review/job_review.service';
import { JobReview } from '../job_review/job_review.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':email')
    async findOne(@Param('email') email: string): Promise<User> {
        return this.userService.findOne(email);
    }

    @Post()
    async create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() user: User): Promise<User> {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.userService.remove(id);
    }
}