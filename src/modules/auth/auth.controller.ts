import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

// Passport 인증 후 Request에 user 속성 추가
interface RequestWithUser extends Request {
  user: any;
}

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google 로그인 시작' })
  googleAuth() {
    // Guard가 요청을 Google로 리디렉션
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google 로그인 콜백' })
  @ApiResponse({
    status: 200,
    description: '인증 성공 시 JWT 토큰 반환',
  })
  async googleAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const tokens = await this.authService.googleLogin(req.user);

    // 프론트엔드 URL로 리디렉션 (토큰 포함)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.redirect(`${frontendUrl}/auth/callback`);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '현재 인증된 사용자 정보 조회' })
  @ApiResponse({
    status: 200,
    description: '인증된 사용자 정보 반환',
  })
  async getMe(@Req() req: RequestWithUser) {
    return this.authService.getUserProfile(req.user.id);
  }

  @Post('refresh')
  @ApiOperation({ summary: '토큰 갱신' })
  @ApiResponse({
    status: 200,
    description: '새로운 액세스 토큰과 리프레시 토큰 반환',
  })
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
