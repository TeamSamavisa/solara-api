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
import { ClassGroup } from 'src/modules/class-group/entities/class-group.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { Space } from 'src/modules/space/entities/space.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Table({ tableName: 'assignments' })
export class Assignment extends Model {
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

  @ForeignKey(() => Subject)
  @Column(DataType.INTEGER)
  subject_id: number;

  @ForeignKey(() => Space)
  @Column(DataType.INTEGER)
  space_id: number;

  @ForeignKey(() => ClassGroup)
  @Column(DataType.INTEGER)
  class_group_id: number;

  @BelongsTo(() => Schedule)
  schedule: Schedule;

  @BelongsTo(() => User)
  teacher: User;

  @BelongsTo(() => Subject)
  subject: Subject;

  @BelongsTo(() => Space)
  space: Space;

  @BelongsTo(() => ClassGroup)
  classGroup: ClassGroup;
}
