import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { SocialAccount } from '../users/entities/social-account.entity';
import { RefreshToken } from '../users/entities/refresh-token.entity';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersRepository;
    private socialAccountsRepository;
    private refreshTokensRepository;
    private jwtService;
    private configService;
    constructor(usersRepository: Repository<User>, socialAccountsRepository: Repository<SocialAccount>, refreshTokensRepository: Repository<RefreshToken>, jwtService: JwtService, configService: ConfigService);
    getUserProfile(userId: number): Promise<{
        id: number;
        email: string;
        name: string;
        profileImage: string;
        role: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    googleLogin(userData: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
            profileImage: string;
        };
    }>;
    generateTokens(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
            profileImage: string;
        };
    }>;
    refreshToken(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
            profileImage: string;
        };
    }>;
}
