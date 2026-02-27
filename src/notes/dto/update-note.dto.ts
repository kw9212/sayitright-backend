import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiPropertyOptional({
    example: 'Cutting-edge',
    description: '수정할 표현/단어 (최대 255자)',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  term?: string;

  @ApiPropertyOptional({ example: '최첨단의, 가장 앞선', description: '수정할 설명' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'This is a cutting-edge technology.',
    description: '수정할 예문',
  })
  @IsOptional()
  @IsString()
  example?: string;
}
