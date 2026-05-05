import { IsString, IsEnum, IsNumber, IsOptional, IsBoolean, IsUrl } from 'class-validator';
import { CourseType } from '@prisma/client';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  provider: string;

  @IsEnum(CourseType)
  type: CourseType;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @IsString()
  instituteId?: string;
}
