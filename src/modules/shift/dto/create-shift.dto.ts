import { IsString, MinLength } from 'class-validator';

export class CreateShiftDto {
  @IsString()
  @MinLength(1, { message: 'Shift name is required' })
  name: string;
}
