import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Milestone } from "./milestone.entity";
import { MilestoneService } from "./milestone.service";

@Controller('Milestones')
export class MilestoneController {
    constructor(private readonly MilestoneService: MilestoneService) { }

    @Get()
    async findAll(): Promise<Milestone[]> {
        return this.MilestoneService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Milestone> {
        return this.MilestoneService.findOne(id);
    }

    @Post()
    async create(@Body() Milestone: Milestone): Promise<Milestone> {
        return this.MilestoneService.create(Milestone);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() Milestone: Milestone): Promise<Milestone> {
        return this.MilestoneService.update(id, Milestone);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.MilestoneService.remove(id);
    }
}