import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { StudiesModule } from './studies/studies.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthorsModule } from './authors/authors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permite acessar o ConfigModule em qualquer lugar do projeto sem reimportar
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT', '3306')), // Valor padrão 3306
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Apenas para desenvolvimento. Use migrations em produção.
      }),
    }),
    StudiesModule,
    ArticlesModule,
    AuthorsModule,
    AuthModule,
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}