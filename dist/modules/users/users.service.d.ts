import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SocialAccount } from './entities/social-account.entity';
export declare class UsersService {
    private usersRepository;
    private socialAccountsRepository;
    constructor(usersRepository: Repository<User>, socialAccountsRepository: Repository<SocialAccount>);
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findBySocialId(provider: string, providerId: string): Promise<SocialAccount | null>;
    create(userData: Partial<User>): Promise<User>;
    createSocialAccount(socialAccountData: Partial<SocialAccount>): Promise<SocialAccount>;
}
