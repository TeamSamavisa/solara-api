import { IsInt, IsPositive } from 'class-validator';

export class CreateSubjectTeacherDto {
  @IsInt()
  @IsPositive({ message: 'Subject ID must be a positive integer' })
  subject_id: number;

  @IsInt()
  @IsPositive({ message: 'Teacher ID must be a positive integer' })
  teacher_id: number;
}
