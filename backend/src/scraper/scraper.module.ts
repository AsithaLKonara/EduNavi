import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { GovernmentScraper } from './government.scraper';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService, GovernmentScraper],
})
export class ScraperModule {}
