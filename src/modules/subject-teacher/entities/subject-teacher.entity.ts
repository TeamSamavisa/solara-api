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
import { Subject } from 'src/modules/subject/entities/subject.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Table({ tableName: 'subject_teachers' })
export class SubjectTeacher extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ApiProperty()
  @ForeignKey(() => Subject)
  @Column(DataType.INTEGER)
  subject_id: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  teacher_id: number;

  @ApiProperty({ type: () => Subject })
  @BelongsTo(() => Subject)
  subject: Subject;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User)
  teacher: User;
}
