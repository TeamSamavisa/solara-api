import { IsString, MinLength, IsInt, IsPositive } from 'class-validator';

export class CreateClassGroupDto {
  @IsString()
  @MinLength(1, { message: 'Class group name is required' })
  name: string;

  @IsString()
  @MinLength(1, { message: 'Semester is required' })
  semester: string;

  @IsString()
  @MinLength(1, { message: 'Module is required' })
  module: string;

  @IsInt()
  @IsPositive({ message: 'Student count must be a positive integer' })
  student_count: number;

  @IsInt()
  @IsPositive({ message: 'Shift ID must be a positive integer' })
  shift_id: number;

  @IsInt()
  @IsPositive({ message: 'Course ID must be a positive integer' })
  course_id: number;
}
