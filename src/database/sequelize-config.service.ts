// database/sequelize-config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { AllConfigType } from '../config/config.type';
import { Dialect } from 'sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const sslEnabled = this.configService.get('database.sslEnabled', {
      infer: true,
    });

    return {
      dialect: this.configService.get<'postgres' | 'mysql'>('database.type', {
        infer: true,
      }) as Dialect,
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      username: this.configService.get('database.username', { infer: true }),
      password: this.configService.get('database.password', { infer: true }),
      database: this.configService.get('database.name', { infer: true }),
      autoLoadModels: true,
      synchronize: this.configService.get('database.synchronize', {
        infer: true,
      }),
      logging:
        this.configService.get('app.nodeEnv', { infer: true }) !== 'production'
          ? console.log
          : false,
      pool: {
        max: this.configService.get('database.maxConnections', { infer: true }),
      },
      dialectOptions: sslEnabled
        ? {
            ssl: {
              rejectUnauthorized: this.configService.get(
                'database.rejectUnauthorized',
                { infer: true },
              ),
              ca:
                this.configService.get('database.ca', { infer: true }) ??
                undefined,
              key:
                this.configService.get('database.key', { infer: true }) ??
                undefined,
              cert:
                this.configService.get('database.cert', { infer: true }) ??
                undefined,
            },
          }
        : {},
    };
  }
}
