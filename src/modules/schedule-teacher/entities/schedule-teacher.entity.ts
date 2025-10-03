import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Table({ tableName: 'schedule_teachers' })
export class ScheduleTeacher extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Schedule)
  @Column(DataType.INTEGER)
  schedule_id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  teacher_id: number;

  @BelongsTo(() => Schedule)
  schedule: Schedule;

  @BelongsTo(() => User)
  teacher: User;
}
