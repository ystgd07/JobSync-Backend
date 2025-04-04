import { User } from './user.entity';
export declare class RefreshToken {
    id: number;
    userId: number;
    token: string;
    expiresAt: Date;
    revoked: boolean;
    createdAt: Date;
    user: User;
}
