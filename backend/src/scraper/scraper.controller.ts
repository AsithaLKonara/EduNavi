import { Controller, Post } from '@nestjs/common';
import { GovernmentScraper } from './government.scraper';

@Controller('scraper')
export class ScraperController {
  constructor(private governmentScraper: GovernmentScraper) {}

  @Post('government')
  async triggerGovernmentScraper() {
    return this.governmentScraper.scrape();
  }
}
