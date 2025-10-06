import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Assignment } from 'src/modules/assignment/entities/assignment.entity';
import { ScheduleTeacher } from 'src/modules/schedule-teacher/entities/schedule-teacher.entity';

@Table({ tableName: 'schedules' })
export class Schedule extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  weekday: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  start_time: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  end_time: string;

  @HasMany(() => ScheduleTeacher)
  scheduleTeachers: ScheduleTeacher[];

  @HasMany(() => Assignment)
  assignments: Assignment[];
}
