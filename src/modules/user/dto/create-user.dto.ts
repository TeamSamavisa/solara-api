import {
  IsString,
  MinLength,
  IsEmail,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1, { message: 'Full name is required' })
  full_name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(1, { message: 'Password is required' })
  password: string;

  @IsOptional()
  @Matches(/^\d+$/, { message: 'Registration must be a numeric string' })
  registration?: string;
}
