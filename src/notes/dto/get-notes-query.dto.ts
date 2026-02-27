import { IsOptional, IsString, IsIn, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetNotesQueryDto {
  @ApiPropertyOptional({ example: 'cutting', description: '검색어 (term 필드 대상)' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({
    enum: ['latest', 'oldest', 'term_asc', 'term_desc'],
    example: 'latest',
    description: '정렬 기준 (기본값: latest)',
  })
  @IsOptional()
  @IsIn(['latest', 'oldest', 'term_asc', 'term_desc'])
  sort?: 'latest' | 'oldest' | 'term_asc' | 'term_desc';

  @ApiPropertyOptional({ example: '1', description: '페이지 번호 (기본값: 1)' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: '10', description: '페이지당 항목 수 (기본값: 10)' })
  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => (value as string) || '10')
  limit?: string;
}
