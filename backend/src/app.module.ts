import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AiModule } from './ai/ai.module';
import { ScraperModule } from './scraper/scraper.module';
import { MonetizationModule } from './monetization/monetization.module';

@Module({
  imports: [UsersModule, CoursesModule, AiModule, ScraperModule, MonetizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
