import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Proposal } from "./proposal.entity";
import { ProposalService } from "./proposal.service";

@Controller('proposals')
export class ProposalController {
    constructor(private readonly proposalService: ProposalService) { }

    @Get()
    async findAll(): Promise<Proposal[]> {
        return this.proposalService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Proposal> {
        return this.proposalService.findOne(id);
    }
    @Post()
    async create(@Body() proposal: Proposal): Promise<Proposal> {
        return this.proposalService.create(proposal);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() proposal: Proposal): Promise<Proposal> {
        return this.proposalService.update(id, proposal);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.proposalService.remove(id);
    }
}