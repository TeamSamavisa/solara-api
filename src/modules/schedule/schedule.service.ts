import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from './entities/schedule.entity';
import { GetSchedulesQueryDto } from './dto/get-schedules.dto';
import { buildWhere } from 'src/utils/build-where';
import { PaginatedResponse } from 'src/utils/types/paginated-response';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule)
    private readonly scheduleModel: typeof Schedule,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const scheduleData = {
      weekday: createScheduleDto.weekday,
      start_time: createScheduleDto.start_time,
      end_time: createScheduleDto.end_time,
    };

    const schedule = await this.scheduleModel.create(scheduleData);
    return schedule.get() as Schedule;
  }

  async list(
    query: GetSchedulesQueryDto,
  ): Promise<PaginatedResponse<Schedule>> {
    const { limit, offset, page, ...filter } = query;

    const result = await Schedule.findAndCountAll({
      where: buildWhere(filter),
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    const totalItems = result.count;
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      content: result.rows,
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
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }
    return schedule;
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    const schedule = await this.ensureRecordExists(id);

    const updateData: UpdateScheduleDto = {};

    if (updateScheduleDto.weekday !== undefined) {
      updateData.weekday = updateScheduleDto.weekday;
    }

    if (updateScheduleDto.start_time !== undefined) {
      updateData.start_time = updateScheduleDto.start_time;
    }

    if (updateScheduleDto.end_time !== undefined) {
      updateData.end_time = updateScheduleDto.end_time;
    }

    await schedule.update(updateData);
    return schedule.get() as Schedule;
  }

  async remove(id: number) {
    const schedule = await this.ensureRecordExists(id);
    await schedule.destroy();
    return schedule;
  }

  private async ensureRecordExists(id: number): Promise<Schedule> {
    const schedule = await this.getById(id);
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }
    return schedule;
  }
}
