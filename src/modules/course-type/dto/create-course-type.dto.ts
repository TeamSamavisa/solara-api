import { IsString, MinLength } from 'class-validator';

export class CreateCourseTypeDto {
  @IsString()
  @MinLength(1, { message: 'Course type name is required' })
  name: string;
}
