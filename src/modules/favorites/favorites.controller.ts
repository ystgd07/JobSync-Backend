import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateFavoriteJobDto,
  FavoriteJobResponseDto,
} from './dto/favorite-job.dto';

interface RequestWithUser extends Request {
  user: { id: number; email: string; role?: string };
}

@ApiTags('찜하기')
@Controller('favorites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: '공고 찜하기' })
  @ApiResponse({
    status: 201,
    description: '공고 찜하기 성공',
    type: FavoriteJobResponseDto,
  })
  async addFavorite(
    @Req() req: RequestWithUser,
    @Body() createFavoriteDto: CreateFavoriteJobDto,
  ) {
    const userId = req.user.id;
    return this.favoritesService.addFavorite(
      userId,
      createFavoriteDto.jobId,
      createFavoriteDto.notes,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: '찜한 공고 삭제' })
  @ApiResponse({ status: 200, description: '찜한 공고 삭제 성공' })
  async removeFavorite(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = req.user.id;
    await this.favoritesService.removeFavorite(userId, id);
    return { success: true };
  }

  @Get()
  @ApiOperation({ summary: '찜한 공고 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '찜한 공고 목록',
    type: [FavoriteJobResponseDto],
  })
  async getFavorites(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.favoritesService.getFavorites(userId);
  }

  @Get('check/:jobId')
  @ApiOperation({ summary: '특정 공고 찜 상태 확인' })
  @ApiResponse({ status: 200, description: '찜 상태' })
  async checkFavorite(
    @Req() req: RequestWithUser,
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    const userId = req.user.id;
    const isFavorite = await this.favoritesService.checkFavorite(userId, jobId);
    return { isFavorite };
  }
}
