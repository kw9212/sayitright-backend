import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiParam,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { GetNotesQueryDto } from './dto/get-notes-query.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteResponseDto, NoteListResponseDto } from './dto/note-response.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import type { AuthRequest } from '../common/types/auth-request.type';

@ApiTags('Notes')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: '인증 필요 (유효한 Access Token 없음)' })
@ApiExtraModels(NoteResponseDto, NoteListResponseDto)
@Controller('v1/notes')
@UseGuards(JwtAccessGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({
    summary: '표현 노트 목록 조회',
    description: '검색어, 정렬, 페이지네이션을 지원합니다.',
  })
  @ApiOkResponse({
    schema: {
      properties: {
        ok: { type: 'boolean', example: true },
        data: { $ref: getSchemaPath(NoteListResponseDto) },
      },
    },
  })
  @Get()
  async findAll(
    @Req() req: AuthRequest,
    @Query() query: GetNotesQueryDto,
  ): Promise<NoteListResponseDto> {
    const userId = req.user.sub;
    return this.notesService.findAll(userId, query);
  }

  @ApiOperation({ summary: '표현 노트 단건 조회' })
  @ApiParam({ name: 'id', description: '노트 ID' })
  @ApiOkResponse({
    schema: {
      properties: {
        ok: { type: 'boolean', example: true },
        data: { $ref: getSchemaPath(NoteResponseDto) },
      },
    },
  })
  @ApiNotFoundResponse({ description: '노트를 찾을 수 없음' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: AuthRequest): Promise<NoteResponseDto> {
    const userId = req.user.sub;
    return this.notesService.findOne(id, userId);
  }

  @ApiOperation({ summary: '표현 노트 생성' })
  @ApiCreatedResponse({
    schema: {
      properties: {
        ok: { type: 'boolean', example: true },
        data: { $ref: getSchemaPath(NoteResponseDto) },
      },
    },
  })
  @Post()
  async create(@Body() dto: CreateNoteDto, @Req() req: AuthRequest): Promise<NoteResponseDto> {
    const userId = req.user.sub;
    return this.notesService.create(userId, dto);
  }

  @ApiOperation({ summary: '표현 노트 수정' })
  @ApiParam({ name: 'id', description: '노트 ID' })
  @ApiOkResponse({
    schema: {
      properties: {
        ok: { type: 'boolean', example: true },
        data: { $ref: getSchemaPath(NoteResponseDto) },
      },
    },
  })
  @ApiNotFoundResponse({ description: '노트를 찾을 수 없음' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateNoteDto,
    @Req() req: AuthRequest,
  ): Promise<NoteResponseDto> {
    const userId = req.user.sub;
    return this.notesService.update(id, userId, dto);
  }

  @ApiOperation({ summary: '표현 노트 삭제' })
  @ApiParam({ name: 'id', description: '노트 ID' })
  @ApiOkResponse({
    schema: { properties: { ok: { type: 'boolean', example: true } } },
  })
  @ApiNotFoundResponse({ description: '노트를 찾을 수 없음' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthRequest): Promise<void> {
    const userId = req.user.sub;
    await this.notesService.remove(id, userId);
  }

  @ApiOperation({ summary: '즐겨찾기 토글', description: '노트의 isStarred 값을 반전합니다.' })
  @ApiParam({ name: 'id', description: '노트 ID' })
  @ApiOkResponse({
    schema: {
      properties: {
        ok: { type: 'boolean', example: true },
        data: { $ref: getSchemaPath(NoteResponseDto) },
      },
    },
  })
  @ApiNotFoundResponse({ description: '노트를 찾을 수 없음' })
  @Patch(':id/star')
  async toggleStar(@Param('id') id: string, @Req() req: AuthRequest): Promise<NoteResponseDto> {
    const userId = req.user.sub;
    return this.notesService.toggleStar(id, userId);
  }
}
