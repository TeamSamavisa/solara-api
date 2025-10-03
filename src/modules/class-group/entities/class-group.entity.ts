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
import { Shift } from 'src/modules/shift/entities/shift.entity';

@Table({ tableName: 'class_groups' })
export class ClassGroup extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  semester: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  module: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  student_count: number;

  @ForeignKey(() => Shift)
  @Column(DataType.INTEGER)
  shift_id: number;

  @ForeignKey(() => Course)
  @Column(DataType.INTEGER)
  course_id: number;

  @BelongsTo(() => Shift)
  shift: Shift;

  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => Assignment)
  assignments: Assignment[];
}
