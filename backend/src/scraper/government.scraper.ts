import { Injectable } from '@nestjs/common';
import { BaseScraper } from './base.scraper';
import { PrismaService } from '../prisma/prisma.service';
import { CourseType } from '@prisma/client';

@Injectable()
export class GovernmentScraper extends BaseScraper {
  constructor(private prisma: PrismaService) {
    super();
  }

  async scrape() {
    await this.init();
    const page = await this.browser.newPage();
    
    // Example: Scraping a government job/course portal
    // This is a placeholder URL and logic for demonstration
    const targetUrl = 'https://www.gazette.lk/category/courses/';
    await page.goto(targetUrl);

    const courses = await page.$$eval('.post-item', (items) => {
      return items.map((item) => {
        const title = item.querySelector('.post-title')?.textContent?.trim() || '';
        const url = item.querySelector('a')?.href || '';
        return { title, url };
      });
    });

    for (const course of courses) {
      await this.prisma.course.upsert({
        where: { url: course.url },
        update: {},
        create: {
          title: course.title,
          url: course.url,
          provider: 'Government Gazette',
          type: CourseType.GOV,
          verified: false,
        },
      });
    }

    await this.close();
    return courses;
  }
}
