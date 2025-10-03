import { IsString, MinLength, IsInt, IsPositive } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @MinLength(1, { message: 'Subject name is required' })
  name: string;

  @IsInt()
  @IsPositive({ message: 'Required space type ID must be a positive integer' })
  required_space_type_id: number;
}
