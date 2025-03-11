import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { StudiesModule } from './studies/studies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from './articles/articles.module';
import { AuthorsModule } from './authors/authors.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,//usar migration
    }),
    StudiesModule,
    ArticlesModule,
    AuthorsModule,
    AuthModule,
    UsersModule],
  providers: [AppService],
})
export class AppModule {}
