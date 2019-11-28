import { Controller, Param, Get, Body, Delete, Post, Put } from '@nestjs/common';
import { PinService as Service } from './pin.service';
import { Pin as SchemaDto } from 'src/schema/pin.schema';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('pin')
@ApiUseTags('pin')
export class PinController {
  constructor(private readonly service: Service) { }

  @Get()
  list() {
    return this.service.read();
  }

  @Post()
  create(@Body() tagDto: SchemaDto) {
    return this.service.create(tagDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Put()
  update(@Body() tagDto: SchemaDto) {
    return this.service.update(tagDto);
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.service.getById(id);
  }

}
