import { ExpressionNote } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NoteResponseDto {
  @ApiProperty({ example: 'clx1abc123', description: '노트 ID' })
  id: string;

  @ApiProperty({ example: 'Cutting-edge', description: '저장된 표현/단어' })
  term: string;

  @ApiPropertyOptional({ example: '최첨단의, 가장 앞선', nullable: true })
  description: string | null;

  @ApiPropertyOptional({ example: 'This is a cutting-edge technology.', nullable: true })
  example: string | null;

  @ApiProperty({ example: false, description: '즐겨찾기 여부' })
  isStarred: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  static fromEntity(note: ExpressionNote): NoteResponseDto {
    return {
      id: note.id,
      term: note.term,
      description: note.description,
      example: note.example,
      isStarred: note.isStarred,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }
}

export class NoteListItemDto {
  @ApiProperty({ example: 'clx1abc123' })
  id: string;

  @ApiProperty({ example: 'Cutting-edge' })
  term: string;

  @ApiPropertyOptional({ example: '최첨단의, 가장 앞선', nullable: true })
  description: string | null;

  @ApiPropertyOptional({ example: 'This is a cutting-edge technology.', nullable: true })
  example: string | null;

  @ApiProperty({ example: false })
  isStarred: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  static fromEntity(note: ExpressionNote): NoteListItemDto {
    return {
      id: note.id,
      term: note.term,
      description: note.description,
      example: note.example,
      isStarred: note.isStarred,
      createdAt: note.createdAt,
    };
  }
}

export class NoteListResponseDto {
  @ApiProperty({ type: [NoteListItemDto] })
  notes: NoteListItemDto[];

  @ApiProperty({
    example: { page: 1, limit: 10, total: 42, totalPages: 5 },
    description: '페이지네이션 정보',
  })
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  constructor(notes: ExpressionNote[], page: number, limit: number, total: number) {
    this.notes = notes.map((note) => NoteListItemDto.fromEntity(note));
    this.pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
