import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(email: string, password: string, name: string) {
    const user = this.repository.create({ email, password, name });

    return this.repository.save(user);
  }

  findOne(uuid: string) {
    return this.repository.findOne({ uuid });
  }

  find(name: string) {
    return this.repository.find({ name });
  }

  findAllUsers(limit: number) {
    return this.repository.find({
      take: limit,
    });
  }

  async update(uuid: string, attributes: Partial<User>) {
    const user = await this.findOne(uuid);
    if (!user) {
      throw new Error('user not found');
    }

    Object.assign(user, attributes);
    return this.repository.save(user);
  }

  async remove(uuid: string) {
    const user = await this.findOne(uuid);
    if (!user) {
      throw new Error('user not found');
    }

    return this.repository.remove(user);
  }
}
