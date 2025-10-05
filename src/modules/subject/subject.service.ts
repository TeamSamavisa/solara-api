import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from './entities/subject.entity';
import { GetSubjectsQueryDto } from './dto/get-subjects.dto';
import { buildWhere } from 'src/utils/build-where';
import { PaginatedResponse } from 'src/utils/types/paginated-response';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject)
    private readonly subjectModel: typeof Subject,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subjectData = {
      name: createSubjectDto.name,
      required_space_type_id: createSubjectDto.required_space_type_id,
    };

    const subject = await this.subjectModel.create(subjectData);
    return subject.get() as Subject;
  }

  async list(query: GetSubjectsQueryDto): Promise<PaginatedResponse<Subject>> {
    const { limit, offset, page, ...filter } = query;

    const result = await Subject.findAndCountAll({
      where: buildWhere(filter),
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: ['requiredSpaceType'],
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
    const subject = await Subject.findByPk(id, {
      include: ['requiredSpaceType'],
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    const subject = await this.ensureRecordExists(id);

    const updateData: UpdateSubjectDto = {};

    if (updateSubjectDto.name !== undefined) {
      updateData.name = updateSubjectDto.name;
    }

    if (updateSubjectDto.required_space_type_id !== undefined) {
      updateData.required_space_type_id =
        updateSubjectDto.required_space_type_id;
    }

    await subject.update(updateData);
    return subject.get() as Subject;
  }

  async remove(id: number) {
    const subject = await this.ensureRecordExists(id);
    await subject.destroy();
    return subject;
  }

  private async ensureRecordExists(id: number): Promise<Subject> {
    const subject = await this.subjectModel.findByPk(id);

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }
}
