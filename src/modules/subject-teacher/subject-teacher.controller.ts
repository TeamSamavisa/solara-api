import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SubjectTeacherService } from './subject-teacher.service';
import { CreateSubjectTeacherDto } from './dto/create-subject-teacher.dto';
import { UpdateSubjectTeacherDto } from './dto/update-subject-teacher.dto';
import { GetSubjectTeachersQueryDto } from './dto/get-subject-teachers.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { SubjectTeacher } from './entities/subject-teacher.entity';
import { ApiPaginatedResponse } from 'src/utils/decorators/api-paginated-response.decorator';

@Controller('subject-teacher')
export class SubjectTeacherController {
  constructor(private readonly subjectTeacherService: SubjectTeacherService) {}

  @Post()
  @ApiCreatedResponse({
    type: SubjectTeacher,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new relationship between subject and teacher',
    description:
      'Creates a new relationship between subject and teacher with the provided data.',
  })
  @ApiBody({
    type: CreateSubjectTeacherDto,
    description: 'SubjectTeacher data transfer object',
  })
  @ApiResponse({
    status: 201,
    description: 'SubjectTeacher created successfully',
    type: SubjectTeacher,
  })
  @ApiResponse({
    status: 422,
    description: 'Data failed validation',
  })
  create(@Body() createSubjectTeacherDto: CreateSubjectTeacherDto) {
    return this.subjectTeacherService.create(createSubjectTeacherDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all SubjectTeachers',
    description:
      'Retrieves a list of all relationships between subjects and teachers with their details.',
  })
  @ApiPaginatedResponse(SubjectTeacher)
  @ApiResponse({
    status: 404,
    description: 'No subject found',
  })
  list(@Query() query: GetSubjectTeachersQueryDto) {
    return this.subjectTeacherService.list(query);
  }

  @Get(':id')
  @ApiOkResponse({
    type: SubjectTeacher,
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get relationship between subject and teacher by ID',
    description:
      'Retrieves a specific relationship between subject and teacher by their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'SubjectTeacher ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'SubjectTeacher found',
    type: SubjectTeacher,
  })
  @ApiResponse({
    status: 404,
    description: 'SubjectTeacher not found',
  })
  getById(@Param('id') id: string) {
    return this.subjectTeacherService.getById(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: SubjectTeacher,
  })
  @ApiOperation({
    summary: 'Update SubjectTeacher',
    description:
      'Updates the relationship between subject and teacher by their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'SubjectTeacher ID to update',
    type: Number,
  })
  @ApiBody({
    type: UpdateSubjectTeacherDto,
    description: 'Updated relationship data',
  })
  @ApiResponse({
    status: 200,
    description: 'SubjectTeacher updated successfully',
    type: SubjectTeacher,
  })
  @ApiResponse({
    status: 404,
    description: 'SubjectTeacher not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateSubjectTeacherDto: UpdateSubjectTeacherDto,
  ) {
    return this.subjectTeacherService.update(+id, updateSubjectTeacherDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'SubjectTeacher ID to delete',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove SubjectTeacher',
    description:
      'Removes a relationship between subject and teacher from the system by their ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'SubjectTeacher removed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'SubjectTeacher not found',
  })
  remove(@Param('id') id: string) {
    return this.subjectTeacherService.remove(+id);
  }
}
