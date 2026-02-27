import { Controller, Get, Delete, Param, Query, UseGuards, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiParam,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { ArchivesService } from './archives.service';
import { GetArchivesQueryDto } from './dto/get-archives-query.dto';
import { ArchiveResponseDto, ArchiveListResponseDto } from './dto/archive-response.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import type { AuthRequest } from '../common/types/auth-request.type';

@ApiTags('Archives')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: '인증 필요 (유효한 Access Token 없음)' })
@ApiExtraModels(ArchiveResponseDto, ArchiveListResponseDto)
@Controller('v1/archives')
@UseGuards(JwtAccessGuard)
export class ArchivesController {
  constructor(private readonly archivesService: ArchivesService) {}

  @ApiOperation({
    summary: 'AI 생성 이메일 아카이브 목록 조회',
    description: '생성된 이메일 아카이브를 페이지네이션, 검색, 필터링하여 조회합니다.',
  })
  @ApiOkResponse({
    schema: {
      properties: {
        ok: { type: 'boolean', example: true },
        data: { $ref: getSchemaPath(ArchiveListResponseDto) },
      },
    },
  })
  @Get()
  async findAll(
    @Req() req: AuthRequest,
    @Query() query: GetArchivesQueryDto,
  ): Promise<ArchiveListResponseDto> {
    const userId = req.user.sub;

    return this.archivesService.findAll(userId, query);
  }

  @ApiOperation({ summary: '아카이브 단건 조회' })
  @ApiParam({ name: 'id', description: '아카이브 ID' })
  @ApiOkResponse({
    schema: {
      properties: {
        ok: { type: 'boolean', example: true },
        data: { $ref: getSchemaPath(ArchiveResponseDto) },
      },
    },
  })
  @ApiNotFoundResponse({ description: '아카이브를 찾을 수 없음' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: AuthRequest): Promise<ArchiveResponseDto> {
    const userId = req.user.sub;

    return this.archivesService.findOne(id, userId);
  }

  @ApiOperation({ summary: '아카이브 삭제' })
  @ApiParam({ name: 'id', description: '아카이브 ID' })
  @ApiOkResponse({
    schema: { properties: { ok: { type: 'boolean', example: true } } },
  })
  @ApiNotFoundResponse({ description: '아카이브를 찾을 수 없음' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthRequest): Promise<void> {
    const userId = req.user.sub;

    await this.archivesService.remove(id, userId);
  }
}
