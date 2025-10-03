import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { BaseQueryDto } from 'src/utils/dto/base-query.dto';

export class GetScheduleTeachersQueryDto extends BaseQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  schedule_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  teacher_id?: number;
}
