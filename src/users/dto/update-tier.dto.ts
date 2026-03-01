import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTierDto {
  @ApiProperty({ enum: ['free', 'premium'], example: 'premium', description: '변경할 플랜 등급' })
  @IsIn(['free', 'premium'])
  tier: 'free' | 'premium';
}
