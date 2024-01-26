import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(createRecordDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.recordService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: Record['id']) {
    return this.recordService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: Record['id']) {
    return this.recordService.remove(id);
  }
}
