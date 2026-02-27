import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    example: 'Cutting-edge',
    description: '저장할 표현/단어 (최대 255자)',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  term: string;

  @ApiPropertyOptional({ example: '최첨단의, 가장 앞선', description: '표현 설명 또는 뜻' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'This is a cutting-edge technology.', description: '예문' })
  @IsOptional()
  @IsString()
  example?: string;
}
