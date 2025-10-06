import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateSubjectTeacherDto {
  @ApiProperty()
  @IsInt()
  @IsPositive({ message: 'Subject ID must be a positive integer' })
  subject_id: number;

  @ApiProperty()
  @IsInt()
  @IsPositive({ message: 'Teacher ID must be a positive integer' })
  teacher_id: number;
}
