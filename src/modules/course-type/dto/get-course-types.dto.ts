import { IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/utils/dto/base-query.dto';

export class GetCourseTypesQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  name?: string;
}
