import { Injectable } from '@nestjs/common';
import { chromium, Browser, Page } from 'playwright';

@Injectable()
export abstract class BaseScraper {
  protected browser: Browser;

  async init() {
    this.browser = await chromium.launch({ headless: true });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  abstract scrape(): Promise<any[]>;
}
