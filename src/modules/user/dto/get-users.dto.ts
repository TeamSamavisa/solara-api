import { IsEmail, IsString, IsOptional, IsNumberString } from 'class-validator';
import { BaseQueryDto } from 'src/utils/dto/base-query.dto';

export class GetUsersQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNumberString()
  @IsOptional()
  registration?: string;
}
