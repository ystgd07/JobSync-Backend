import { SocialAccount } from './social-account.entity';
import { RefreshToken } from './refresh-token.entity';
export declare class User {
    id: number;
    email: string;
    name: string;
    profileImage: string;
    isActive: boolean;
    role: string;
    socialAccounts: SocialAccount[];
    refreshTokens: RefreshToken[];
    createdAt: Date;
    updatedAt: Date;
}
