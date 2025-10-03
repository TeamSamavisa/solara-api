import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Assignment } from 'src/modules/assignment/entities/assignment.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { SpaceType } from 'src/modules/space-type/entities/space-type.entity';
import { SubjectTeacher } from 'src/modules/subject-teacher/entities/subject-teacher.entity';

@Table({ tableName: 'subjects' })
export class Subject extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => SpaceType)
  @Column(DataType.INTEGER)
  required_space_type_id: number;

  @ForeignKey(() => Course)
  @Column(DataType.INTEGER)
  course_id: number;

  @BelongsTo(() => SpaceType)
  requiredSpaceType: SpaceType;

  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => SubjectTeacher)
  subjectTeachers: SubjectTeacher[];

  @HasMany(() => Assignment)
  assignments: Assignment[];
}
