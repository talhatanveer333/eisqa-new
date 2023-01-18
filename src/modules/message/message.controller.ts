import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Message } from "./message.entity";
import { MessageService } from "./message.service";

@Controller('Messages')
export class MessageController {
    constructor(private readonly MessageService: MessageService) { }

    @Get()
    async findAll(): Promise<Message[]> {
        return this.MessageService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Message> {
        return this.MessageService.findOne(id);
    }

    @Post()
    async create(@Body() Message: Message): Promise<Message> {
        return this.MessageService.create(Message);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() Message: Message): Promise<Message> {
        return this.MessageService.update(id, Message);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.MessageService.remove(id);
    }
}