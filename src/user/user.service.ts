import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

interface UserTree extends User {
  subordinates: UserTree[];
}

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username }
    });
  }

  findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'parentUserId']
    });
  }

  async create(user: { username: string; password: string; parentUserId: string | null }): Promise<User> {
    return this.usersRepository.save(user);
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    const { username, ...userData } = user;
    await this.usersRepository.update(id, userData);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findUserTree(): Promise<UserTree[]> {
    const users = await this.usersRepository.find({
      select: ['id', 'username', 'parentUserId']
    });
    return this.buildUserTree(users);
  }

  private buildUserTree(users: User[]): UserTree[] {
    const userMap: { [key: string]: UserTree } = {};

    users.forEach(user => {
      userMap[user.id] = { ...user, subordinates: [] };
    });

    const userTree: UserTree[] = [];

    users.forEach(user => {
      if (user.parentUserId === null) {
        userTree.push(userMap[user.id]);
      } else if (userMap[user.parentUserId]) {
        userMap[user.parentUserId].subordinates.push(userMap[user.id]);
      }
    });

    return userTree;
  }
}
