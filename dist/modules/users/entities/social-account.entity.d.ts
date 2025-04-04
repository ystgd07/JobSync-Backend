import { User } from './user.entity';
export declare class SocialAccount {
    id: number;
    userId: number;
    provider: string;
    providerId: string;
    providerData: any;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
