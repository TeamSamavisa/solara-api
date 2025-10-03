import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { BaseQueryDto } from 'src/utils/dto/base-query.dto';

export class GetSpacesQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  floor?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  capacity?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  blocked?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  space_type_id?: number;
}
