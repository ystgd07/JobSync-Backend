import { Request, Response } from 'express';
import { AuthService } from './auth.service';
interface RequestWithUser extends Request {
    user: any;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleAuth(): void;
    googleAuthRedirect(req: RequestWithUser, res: Response): Promise<void>;
    getMe(req: RequestWithUser): Promise<{
        id: number;
        email: string;
        name: string;
        profileImage: string;
        role: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    refreshToken(refreshToken: string): Promise<{
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
export {};
