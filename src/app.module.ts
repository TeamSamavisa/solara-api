import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AssignmentModule } from 'src/modules/assignment/assignment.module';
import { ClassGroupModule } from 'src/modules/class-group/class-group.module';
import { CourseModule } from 'src/modules/course/course.module';
import { CourseTypeModule } from 'src/modules/course-type/course-type.module';
import { ShiftModule } from 'src/modules/shift/shift.module';
import { SpaceTypeModule } from 'src/modules/space-type/space-type.module';
import { SubjectModule } from 'src/modules/subject/subject.module';
import { UserModule } from 'src/modules/user/user.module';
import { SubjectTeacherModule } from 'src/modules/subject-teacher/subject-teacher.module';
import { ScheduleTeacherModule } from 'src/modules/schedule-teacher/schedule-teacher.module';
import { SequelizeConfigService } from 'src/database/sequelize-config.service';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { SpaceModule } from './modules/space/space.module';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/database/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    AssignmentModule,
    ClassGroupModule,
    CourseModule,
    CourseTypeModule,
    ScheduleModule,
    ShiftModule,
    SpaceTypeModule,
    SpaceModule,
    SubjectModule,
    UserModule,
    SubjectTeacherModule,
    ScheduleTeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
