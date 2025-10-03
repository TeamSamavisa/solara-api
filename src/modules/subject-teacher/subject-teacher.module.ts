import { Module } from '@nestjs/common';
import { SubjectTeacherService } from './subject-teacher.service';
import { SubjectTeacherController } from './subject-teacher.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubjectTeacher } from './entities/subject-teacher.entity';

@Module({
  imports: [SequelizeModule.forFeature([SubjectTeacher])],
  controllers: [SubjectTeacherController],
  providers: [SubjectTeacherService],
  exports: [SequelizeModule],
})
export class SubjectTeacherModule {}
