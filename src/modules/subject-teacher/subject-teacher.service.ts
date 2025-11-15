import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectTeacherDto } from './dto/create-subject-teacher.dto';
import { UpdateSubjectTeacherDto } from './dto/update-subject-teacher.dto';
import { SubjectTeacher } from './entities/subject-teacher.entity';
import { InjectModel } from '@nestjs/sequelize';
import { GetSubjectTeachersQueryDto } from './dto/get-subject-teachers.dto';
import { buildWhere } from 'src/utils/build-where';
import { PaginatedResponse } from 'src/utils/types/paginated-response';

@Injectable()
export class SubjectTeacherService {
  constructor(
    @InjectModel(SubjectTeacher)
    private readonly subjectTeacherModel: typeof SubjectTeacher,
  ) {}

  async create(
    createSubjectTeacherDto: CreateSubjectTeacherDto,
  ): Promise<SubjectTeacher> {
    const subjectTeacherData = {
      subject_id: createSubjectTeacherDto.subject_id,
      teacher_id: createSubjectTeacherDto.teacher_id,
    };

    const subjectTeacher =
      await this.subjectTeacherModel.create(subjectTeacherData);
    return subjectTeacher.get() as SubjectTeacher;
  }

  async list(
    query: GetSubjectTeachersQueryDto,
  ): Promise<PaginatedResponse<SubjectTeacher>> {
    const { limit, offset, page, ...filter } = query;

    const result = await this.subjectTeacherModel.findAndCountAll({
      where: buildWhere(filter),
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: ['subject', 'teacher'],
      raw: true,
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
    const subjectTeacher = await this.subjectTeacherModel.findByPk(id, {
      include: ['subject', 'teacher'],
      raw: true,
    });

    if (!subjectTeacher) {
      throw new NotFoundException(
        'Association between teacher and subject not found',
      );
    }

    return subjectTeacher;
  }

  async update(
    id: number,
    updateSubjectTeacherDto: UpdateSubjectTeacherDto,
  ): Promise<SubjectTeacher> {
    const subjectTeacher = await this.ensureRecordExists(id);

    const updateData: UpdateSubjectTeacherDto = {};

    if (updateSubjectTeacherDto.subject_id !== undefined) {
      updateData.subject_id = updateSubjectTeacherDto.subject_id;
    }

    if (updateSubjectTeacherDto.teacher_id !== undefined) {
      updateData.teacher_id = updateSubjectTeacherDto.teacher_id;
    }

    await subjectTeacher.update(updateData);
    return subjectTeacher.get() as SubjectTeacher;
  }

  async remove(id: number) {
    const subjectTeacher = await this.ensureRecordExists(id);
    await subjectTeacher.destroy();
    return subjectTeacher;
  }

  private async ensureRecordExists(id: number): Promise<SubjectTeacher> {
    const subjectTeacher = await this.subjectTeacherModel.findByPk(id);

    if (!subjectTeacher) {
      throw new NotFoundException(
        'Association between teacher and subject not found',
      );
    }

    return subjectTeacher;
  }
}
