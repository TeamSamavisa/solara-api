import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SpaceTypeService } from './space-type.service';
import { CreateSpaceTypeDto } from './dto/create-space-type.dto';
import { UpdateSpaceTypeDto } from './dto/update-space-type.dto';
import { GetSpaceTypesQueryDto } from './dto/get-space-types.dto';

@Controller('space-type')
export class SpaceTypeController {
  constructor(private readonly spaceTypeService: SpaceTypeService) {}

  @Post()
  create(@Body() createSpaceTypeDto: CreateSpaceTypeDto) {
    return this.spaceTypeService.create(createSpaceTypeDto);
  }

  @Get()
  list(@Query() query: GetSpaceTypesQueryDto) {
    return this.spaceTypeService.list(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.spaceTypeService.getById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpaceTypeDto: UpdateSpaceTypeDto,
  ) {
    return this.spaceTypeService.update(+id, updateSpaceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceTypeService.remove(+id);
  }
}
