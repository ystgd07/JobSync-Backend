import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SocialAccount } from './entities/social-account.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(SocialAccount)
    private socialAccountsRepository: Repository<SocialAccount>,
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findBySocialId(
    provider: string,
    providerId: string,
  ): Promise<SocialAccount | null> {
    return this.socialAccountsRepository.findOne({
      where: { provider, providerId },
      relations: ['user'],
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async createSocialAccount(
    socialAccountData: Partial<SocialAccount>,
  ): Promise<SocialAccount> {
    const socialAccount =
      this.socialAccountsRepository.create(socialAccountData);
    return this.socialAccountsRepository.save(socialAccount);
  }
}
