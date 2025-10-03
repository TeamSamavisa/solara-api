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
import { SubjectTeacherService } from './subject-teacher.service';
import { CreateSubjectTeacherDto } from './dto/create-subject-teacher.dto';
import { UpdateSubjectTeacherDto } from './dto/update-subject-teacher.dto';
import { GetSubjectTeachersQueryDto } from './dto/get-subject-teachers.dto';

@Controller('subject-teacher')
export class SubjectTeacherController {
  constructor(private readonly subjectTeacherService: SubjectTeacherService) {}

  @Post()
  create(@Body() createSubjectTeacherDto: CreateSubjectTeacherDto) {
    return this.subjectTeacherService.create(createSubjectTeacherDto);
  }

  @Get()
  list(@Query() query: GetSubjectTeachersQueryDto) {
    return this.subjectTeacherService.list(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.subjectTeacherService.getById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubjectTeacherDto: UpdateSubjectTeacherDto,
  ) {
    return this.subjectTeacherService.update(+id, updateSubjectTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectTeacherService.remove(+id);
  }
}
