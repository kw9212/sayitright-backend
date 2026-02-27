import { Archive } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ArchiveResponseDto {
  @ApiProperty({ example: 'clx1abc123', description: '아카이브 ID' })
  id: string;

  @ApiPropertyOptional({ example: '미팅 일정 조율', description: '아카이브 제목' })
  title?: string;

  @ApiProperty({
    example: '안녕하세요. 내일 미팅을 오후 3시로 변경하고자 합니다...',
    description: '이메일 전문',
  })
  content: string;

  @ApiProperty({ example: '정중하게', description: '이메일 톤' })
  tone: string;

  @ApiPropertyOptional({ example: '일정 조율' })
  purpose?: string;

  @ApiPropertyOptional({ example: '팀원' })
  target?: string;

  @ApiPropertyOptional({ example: '직장 상사' })
  relationship?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  static fromEntity(archive: Archive): ArchiveResponseDto {
    return {
      id: archive.id,
      title: archive.title || undefined,
      content: archive.content,
      tone: archive.tone,
      purpose: archive.purpose || undefined,
      target: archive.target || undefined,
      relationship: archive.relationship || undefined,
      createdAt: archive.createdAt,
      updatedAt: archive.updatedAt,
    };
  }
}

export class ArchiveListItemDto {
  @ApiProperty({ example: 'clx1abc123' })
  id: string;

  @ApiPropertyOptional({ example: '미팅 일정 조율' })
  title?: string;

  @ApiProperty({
    example: '안녕하세요. 내일 미팅을...',
    description: '이메일 내용 미리보기 (최대 200자)',
  })
  preview: string;

  @ApiProperty({ example: '정중하게' })
  tone: string;

  @ApiPropertyOptional({ example: '일정 조율' })
  purpose?: string;

  @ApiPropertyOptional({ example: '팀원' })
  target?: string;

  @ApiPropertyOptional({ example: '직장 상사' })
  relationship?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  static fromEntity(
    archive: Pick<
      Archive,
      'id' | 'title' | 'tone' | 'purpose' | 'target' | 'relationship' | 'createdAt' | 'updatedAt'
    > & {
      preview?: string | null;
      content?: string;
    },
  ): ArchiveListItemDto {
    let preview = archive.preview || '';
    if (!preview && archive.content) {
      preview =
        archive.content.length > 200 ? archive.content.substring(0, 197) + '...' : archive.content;
    }

    return {
      id: archive.id,
      title: archive.title || undefined,
      preview: preview || '(내용 없음)',
      tone: archive.tone,
      purpose: archive.purpose || undefined,
      target: archive.target || undefined,
      relationship: archive.relationship || undefined,
      createdAt: archive.createdAt,
      updatedAt: archive.updatedAt,
    };
  }
}

export class ArchiveListResponseDto {
  @ApiProperty({ type: [ArchiveListItemDto] })
  items: ArchiveListItemDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}
