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
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Subject)
  @Column(DataType.INTEGER)
  subject_id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  teacher_id: number;

  @BelongsTo(() => Subject)
  subject: Subject;

  @BelongsTo(() => User)
  teacher: User;
}
