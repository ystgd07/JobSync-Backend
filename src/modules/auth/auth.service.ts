// src/modules/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { SocialAccount } from '../users/entities/social-account.entity';
import { RefreshToken } from '../users/entities/refresh-token.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(SocialAccount)
    private socialAccountsRepository: Repository<SocialAccount>,
    @InjectRepository(RefreshToken)
    private refreshTokensRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async googleLogin(userData: any) {
    // 소셜 계정 조회
    let socialAccount = await this.socialAccountsRepository.findOne({
      where: {
        provider: 'google',
        providerId: userData.googleId,
      },
      relations: ['user'],
    });

    let user: User | null;

    if (socialAccount) {
      // 이미 가입된 소셜 계정이 있는 경우
      user = socialAccount.user;

      // 사용자 정보 업데이트
      if (
        user.name !== userData.name ||
        user.profileImage !== userData.profileImage
      ) {
        user.name = userData.name;
        user.profileImage = userData.profileImage;
        await this.usersRepository.save(user);
      }
    } else {
      // 동일 이메일로 가입된 계정이 있는지 확인
      user = await this.usersRepository.findOne({
        where: { email: userData.email },
      });

      if (user) {
        // 이메일이 동일한 사용자가 있으면 소셜 계정 연결
        socialAccount = this.socialAccountsRepository.create({
          userId: user.id,
          provider: 'google',
          providerId: userData.googleId,
          providerData: { accessToken: userData.accessToken },
        });
        await this.socialAccountsRepository.save(socialAccount);
      } else {
        // 신규 사용자 생성
        user = this.usersRepository.create({
          email: userData.email,
          name: userData.name,
          profileImage: userData.profileImage,
        });
        await this.usersRepository.save(user);

        // 소셜 계정 생성
        socialAccount = this.socialAccountsRepository.create({
          userId: user.id,
          provider: 'google',
          providerId: userData.googleId,
          providerData: { accessToken: userData.accessToken },
        });
        await this.socialAccountsRepository.save(socialAccount);
      }
    }

    // JWT 토큰 생성
    return this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const payload = { email: user.email, sub: user.id };

    // Access Token 생성
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
    });

    // Refresh Token 생성
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    });

    // Refresh Token DB에 저장
    const expiresAt = new Date();
    expiresAt.setSeconds(
      expiresAt.getSeconds() +
        parseInt(
          this.configService.get<string>('JWT_REFRESH_EXPIRATION_SECONDS') ||
            '0',
        ),
    );

    await this.refreshTokensRepository.save({
      userId: user.id,
      token: refreshToken,
      expiresAt,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
      },
    };
  }

  // 토큰 재발급 메소드 (옵션)
  async refreshToken(token: string) {
    try {
      // Refresh Token 검증
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const refreshTokenEntity = await this.refreshTokensRepository.findOne({
        where: { token, revoked: false },
      });

      if (!refreshTokenEntity) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // 토큰 만료 검사
      if (new Date() > refreshTokenEntity.expiresAt) {
        throw new UnauthorizedException('Refresh token expired');
      }

      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // 기존 토큰 폐기 및 새 토큰 발급
      refreshTokenEntity.revoked = true;
      await this.refreshTokensRepository.save(refreshTokenEntity);

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
