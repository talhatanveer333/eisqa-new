import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { JobService } from '../job/job.service';
import { Job } from '../job/job.entity';
import { ProposalService } from '../proposal/proposal.service';
import { Proposal } from '../proposal/proposal.entity';
import { JobReviewService } from '../job_review/job_review.service';
import { JobReview } from '../job_review/job_review.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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

    @Put(':email')
    async update(@Param('email') email: string, @Body() user: User): Promise<User> {
        return this.userService.update(email, user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.userService.remove(id);
    }
}