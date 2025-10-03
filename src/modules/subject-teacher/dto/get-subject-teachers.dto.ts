import { IsOptional, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseQueryDto } from 'src/utils/dto/base-query.dto';

export class GetSubjectTeachersQueryDto extends BaseQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  subject_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  teacher_id?: number;
}
