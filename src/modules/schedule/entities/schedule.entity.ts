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
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  weekday: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  start_time: string;

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
