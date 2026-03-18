import { IsString, MinLength, MaxLength, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'currentpassword123',
    description: '현재 비밀번호',
  })
  @IsString()
  @MinLength(1, { message: '현재 비밀번호를 입력해주세요.' })
  currentPassword: string;

  @ApiProperty({
    example: 'newpassword123',
    description: '새 비밀번호 (8~72자)',
    minLength: 8,
    maxLength: 72,
  })
  @IsString()
  @MinLength(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
  @MaxLength(72, { message: '비밀번호는 72자 이하여야 합니다.' })
  newPassword: string;

  @ApiProperty({
    example: '123456',
    description: '이메일로 받은 6자리 인증 코드',
  })
  @IsString()
  @Length(6, 6, { message: '인증 코드는 6자리여야 합니다.' })
  emailCode: string;
}
