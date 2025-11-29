import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { GetAssignmentsQueryDto } from './dto/get-assignments.dto';
import { buildWhere } from 'src/utils/build-where';
import { PaginatedResponse } from 'src/utils/types/paginated-response';
import { User } from '../user/entities/user.entity';
import { Subject } from '../subject/entities/subject.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { Space } from '../space/entities/space.entity';
import { ClassGroup } from '../class-group/entities/class-group.entity';
import { Course } from '../course/entities/course.entity';
import { Shift } from '../shift/entities/shift.entity';

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

    const whereClause = buildWhere(filter);

    const { rows, count } = await this.assignmentModel.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'full_name', 'email'],
        },
        { model: Subject, as: 'subject', attributes: ['id', 'name'] },
        {
          model: Schedule,
          as: 'schedule',
          attributes: ['id', 'weekday', 'start_time', 'end_time'],
        },
        { model: Space, as: 'space', attributes: ['id', 'name', 'capacity'] },
        {
          model: ClassGroup,
          as: 'classGroup',
          attributes: ['id', 'name'],
          include: [
            {
              model: Course,
              as: 'course',
              attributes: ['id', 'name'],
            },
            {
              model: Shift,
              as: 'shift',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      attributes: {
        include: [
          [
            this.assignmentModel.sequelize!.literal(`
              CASE 
                WHEN \`Assignment\`.schedule_id IS NULL THEN false
                WHEN NOT EXISTS (
                  SELECT 1 FROM schedule_teachers st 
                  WHERE st.teacher_id = \`Assignment\`.teacher_id
                ) THEN false
                WHEN EXISTS (
                  SELECT 1 FROM schedule_teachers st 
                  WHERE st.teacher_id = \`Assignment\`.teacher_id 
                  AND st.schedule_id = \`Assignment\`.schedule_id
                ) THEN false
                ELSE true
              END
            `),
            'violates_availability',
          ],
        ],
      },
      raw: true,
    });

    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      content: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage,
      },
    };
  }

  async getById(id: number) {
    const assignment = await this.assignmentModel.findByPk(id, {
      attributes: {
        include: [
          [
            this.assignmentModel.sequelize!.literal(`
              CASE 
                WHEN \`Assignment\`.schedule_id IS NULL THEN false
                WHEN NOT EXISTS (
                  SELECT 1 FROM schedule_teachers st 
                  WHERE st.teacher_id = \`Assignment\`.teacher_id
                ) THEN false
                WHEN EXISTS (
                  SELECT 1 FROM schedule_teachers st 
                  WHERE st.teacher_id = \`Assignment\`.teacher_id 
                  AND st.schedule_id = \`Assignment\`.schedule_id
                ) THEN false
                ELSE true
              END
            `),
            'violates',
          ],
        ],
      },
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
