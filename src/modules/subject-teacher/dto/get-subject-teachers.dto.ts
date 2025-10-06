import { IsOptional, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseQueryDto } from 'src/utils/dto/base-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetSubjectTeachersQueryDto extends BaseQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  subject_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  teacher_id?: number;
}
