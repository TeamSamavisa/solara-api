import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { GetAssignmentsQueryDto } from './dto/get-assignments.dto';
import { buildWhere } from 'src/utils/build-where';
import { PaginatedResponse } from 'src/utils/types/paginated-response';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment)
    private readonly assignmentModel: typeof Assignment,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const assignmentData = {
      schedule_id: createAssignmentDto.schedule_id,
      teacher_id: createAssignmentDto.teacher_id,
      subject_id: createAssignmentDto.subject_id,
      space_id: createAssignmentDto.space_id,
      class_group_id: createAssignmentDto.class_group_id,
    };

    const assignment = await this.assignmentModel.create(assignmentData);
    return assignment.get() as Assignment;
  }

  async list(
    query: GetAssignmentsQueryDto,
  ): Promise<PaginatedResponse<Assignment>> {
    const { limit, offset, page, ...filter } = query;

    const result = await this.assignmentModel.findAndCountAll({
      where: buildWhere(filter),
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: ['schedule', 'teacher', 'subject', 'space', 'classGroup'],
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
    const assignment = await this.assignmentModel.findByPk(id, {
      include: ['schedule', 'teacher', 'subject', 'space', 'classGroup'],
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment;
  }

  async update(
    id: number,
    updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    const assignment = await this.ensureRecordExists(id);

    const updateData: UpdateAssignmentDto = {};

    if (updateAssignmentDto.schedule_id !== undefined) {
      updateData.schedule_id = updateAssignmentDto.schedule_id;
    }

    if (updateAssignmentDto.teacher_id !== undefined) {
      updateData.teacher_id = updateAssignmentDto.teacher_id;
    }

    if (updateAssignmentDto.subject_id !== undefined) {
      updateData.subject_id = updateAssignmentDto.subject_id;
    }

    if (updateAssignmentDto.space_id !== undefined) {
      updateData.space_id = updateAssignmentDto.space_id;
    }

    if (updateAssignmentDto.class_group_id !== undefined) {
      updateData.class_group_id = updateAssignmentDto.class_group_id;
    }

    await assignment.update(updateData);
    return assignment.get() as Assignment;
  }

  async remove(id: number) {
    const assignment = await this.ensureRecordExists(id);
    await assignment.destroy();
    return assignment;
  }

  private async ensureRecordExists(id: number): Promise<Assignment> {
    const assignment = await this.assignmentModel.findByPk(id);

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment;
  }
}
