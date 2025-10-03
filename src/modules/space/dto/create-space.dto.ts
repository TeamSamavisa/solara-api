import {
  IsString,
  MinLength,
  IsInt,
  IsPositive,
  IsBoolean,
} from 'class-validator';

export class CreateSpaceDto {
  @IsString()
  @MinLength(1, { message: 'Space name is required' })
  name: string;

  @IsInt({ message: 'Floor must be an integer' })
  floor: number;

  @IsInt()
  @IsPositive({ message: 'Capacity must be a positive integer' })
  capacity: number;

  @IsBoolean()
  blocked: boolean;

  @IsInt()
  @IsPositive({ message: 'Space type ID must be a positive integer' })
  space_type_id: number;
}
