import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ApiProperty()
  @ForeignKey(() => Schedule)
  @Column(DataType.INTEGER)
  schedule_id: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  teacher_id: number;

  @ApiProperty()
  @ForeignKey(() => Subject)
  @Column(DataType.INTEGER)
  subject_id: number;

  @ApiProperty()
  @ForeignKey(() => Space)
  @Column(DataType.INTEGER)
  space_id: number;

  @ApiProperty()
  @ForeignKey(() => ClassGroup)
  @Column(DataType.INTEGER)
  class_group_id: number;

  @ApiProperty()
  @BelongsTo(() => Schedule)
  schedule: Schedule;

  @ApiProperty()
  @BelongsTo(() => User)
  teacher: User;

  @ApiProperty()
  @BelongsTo(() => Subject)
  subject: Subject;

  @ApiProperty()
  @BelongsTo(() => Space)
  space: Space;

  @ApiProperty()
  @BelongsTo(() => ClassGroup)
  classGroup: ClassGroup;
}
