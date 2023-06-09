import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from '../../repositories/User.repository';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@models/User.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly userRepository: UserRepository,
  ) {}
  login(loginDto: LoginDto) {
    return 'This action adds a new auth';
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async findUserByUsername(username: string) {
    return this.userModel.findOne({
      where: { username },
      attributes: { exclude: ['password'] },
    });
  }
}
