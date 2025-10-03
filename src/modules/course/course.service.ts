import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { InjectModel } from '@nestjs/sequelize';
import { GetCoursesQueryDto } from './dto/get-courses.dto';
import { buildWhere } from 'src/utils/build-where';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private readonly courseModel: typeof Course,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const courseData = {
      name: createCourseDto.name,
      course_type_id: createCourseDto.course_type_id,
    };

    const course = await this.courseModel.create(courseData);
    return course.get();
  }

  async list(query: GetCoursesQueryDto) {
    const { limit, offset, page, ...filter } = query;

    const result = await this.courseModel.findAndCountAll({
      where: buildWhere(filter),
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: ['course_type'],
    });

    const totalItems = result.count;
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      content: result.rows.map((row) => row.toJSON()),
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage,
      },
    };
  }

  async getById(id: number) {
    const course = await this.courseModel.findByPk(id, {
      include: ['courseType'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.ensureRecordExists(id);

    const updateData: UpdateCourseDto = {};

    if (updateCourseDto.name !== undefined) {
      updateData.name = updateCourseDto.name;
    }

    if (updateCourseDto.course_type_id !== undefined) {
      updateData.course_type_id = updateCourseDto.course_type_id;
    }

    await course.update(updateData);
    return course.get();
  }

  async remove(id: number) {
    const course = await this.ensureRecordExists(id);
    await course.destroy();
    return course;
  }

  private async ensureRecordExists(id: number): Promise<Course> {
    const course = await this.courseModel.findByPk(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }
}
