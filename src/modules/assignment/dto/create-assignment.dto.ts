import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty()
  @IsInt()
  @IsPositive({ message: 'Schedule ID must be a positive integer' })
  schedule_id: number;

  @ApiProperty()
  @IsInt()
  @IsPositive({ message: 'Teacher ID must be a positive integer' })
  teacher_id: number;

  @ApiProperty()
  @IsInt()
  @IsPositive({ message: 'Subject ID must be a positive integer' })
  subject_id: number;

  @ApiProperty()
  @IsInt()
  @IsPositive({ message: 'Space ID must be a positive integer' })
  space_id: number;

  @ApiProperty()
  @IsInt()
  @IsPositive({ message: 'Class group ID must be a positive integer' })
  class_group_id: number;
}
