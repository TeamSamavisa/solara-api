import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  Scopes,
} from 'sequelize-typescript';
import { Assignment } from 'src/modules/assignment/entities/assignment.entity';
import { ScheduleTeacher } from 'src/modules/schedule-teacher/entities/schedule-teacher.entity';
import { SubjectTeacher } from 'src/modules/subject-teacher/entities/subject-teacher.entity';

@Scopes(() => ({
  defaultScope: {
    attributes: { exclude: ['password_hash'] },
  },
  withPassword: {
    attributes: { include: ['password_hash'] },
  },
}))
@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  registration: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password_hash: string;

  @HasMany(() => SubjectTeacher)
  subjectTeachers: SubjectTeacher[];

  @HasMany(() => ScheduleTeacher)
  scheduleTeachers: ScheduleTeacher[];

  @HasMany(() => Assignment)
  assignments: Assignment[];
}
