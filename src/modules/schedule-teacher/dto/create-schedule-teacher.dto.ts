import { IsInt, IsPositive } from 'class-validator';

export class CreateScheduleTeacherDto {
  @IsInt()
  @IsPositive({ message: 'Schedule ID must be a positive integer' })
  schedule_id: number;

  @IsInt()
  @IsPositive({ message: 'Teacher ID must be a positive integer' })
  teacher_id: number;
}
