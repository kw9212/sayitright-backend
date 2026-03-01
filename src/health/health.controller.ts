import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({
    summary: '서버 상태 확인',
    description: '서버가 정상적으로 동작 중인지 확인합니다.',
  })
  @ApiOkResponse({
    schema: {
      properties: {
        ok: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: { status: { type: 'string', example: 'ok' } },
        },
      },
    },
  })
  @Get()
  health(): { status: string } {
    this.logger.log('Health check endpoint called');
    return this.healthService.checkHealth();
  }
}
