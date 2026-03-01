import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    example: '홍길동',
    description: '닉네임 (2~20자)',
    minLength: 2,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: '닉네임은 2글자 이상이어야 합니다.' })
  @MaxLength(20, { message: '닉네임은 20글자 이하여야 합니다.' })
  username?: string;

  @ApiPropertyOptional({
    example: 'newpassword123',
    description: '새 비밀번호 (8~72자)',
    minLength: 8,
    maxLength: 72,
  })
  @IsOptional()
  @IsString()
  @MinLength(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
  @MaxLength(72, { message: '비밀번호는 72자 이하여야 합니다.' })
  password?: string;
}
