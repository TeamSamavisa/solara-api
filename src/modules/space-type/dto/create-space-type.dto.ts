import { IsString, MinLength } from 'class-validator';

export class CreateSpaceTypeDto {
  @IsString()
  @MinLength(1, { message: 'Space type name is required' })
  name: string;
}
