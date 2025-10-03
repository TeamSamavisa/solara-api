import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ScheduleTeacherService } from './schedule-teacher.service';
import { CreateScheduleTeacherDto } from './dto/create-schedule-teacher.dto';
import { UpdateScheduleTeacherDto } from './dto/update-schedule-teacher.dto';
import { GetScheduleTeachersQueryDto } from './dto/get-schedule-teachers.dto';

@Controller('schedule-teacher')
export class ScheduleTeacherController {
  constructor(
    private readonly scheduleTeacherService: ScheduleTeacherService,
  ) {}

  @Post()
  create(@Body() createScheduleTeacherDto: CreateScheduleTeacherDto) {
    return this.scheduleTeacherService.create(createScheduleTeacherDto);
  }

  @Get()
  list(@Query() query: GetScheduleTeachersQueryDto) {
    return this.scheduleTeacherService.list(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.scheduleTeacherService.getById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleTeacherDto: UpdateScheduleTeacherDto,
  ) {
    return this.scheduleTeacherService.update(+id, updateScheduleTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleTeacherService.remove(+id);
  }
}
