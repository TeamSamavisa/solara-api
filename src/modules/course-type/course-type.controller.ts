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
import { CourseTypeService } from './course-type.service';
import { CreateCourseTypeDto } from './dto/create-course-type.dto';
import { UpdateCourseTypeDto } from './dto/update-course-type.dto';
import { GetCourseTypesQueryDto } from './dto/get-course-types.dto';

@Controller('course-type')
export class CourseTypeController {
  constructor(private readonly courseTypeService: CourseTypeService) {}

  @Post()
  create(@Body() createCourseTypeDto: CreateCourseTypeDto) {
    return this.courseTypeService.create(createCourseTypeDto);
  }

  @Get()
  list(@Query() query: GetCourseTypesQueryDto) {
    return this.courseTypeService.list(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.courseTypeService.getById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseTypeDto: UpdateCourseTypeDto,
  ) {
    return this.courseTypeService.update(+id, updateCourseTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseTypeService.remove(+id);
  }
}
