import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record.entity';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(createRecordDto);
  }

  @Get()
  findAll() {
    return this.recordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Record['id']) {
    return this.recordService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: Record['id']) {
    return this.recordService.remove(id);
  }
}
