import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginRequest } from './requests/login.request';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '@models/User.model';
import { RoleModel } from '@models/Role.model';
import { compareHash } from '@helpers/utils.helpers';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import UserResource from './resources/login.resource';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async login(loginDto: LoginRequest) {
    const username = loginDto.username;
    const password = loginDto.password;
    const user = await this.findUserByUsername(username);

    if (!user) {
      return {
        code: 'E1002',
        status: HttpStatus.UNAUTHORIZED,
      };
    }

    const isMatchPassword = await compareHash(password, user.password);
    if (!isMatchPassword) {
      return {
        code: 'E1002',
        status: HttpStatus.UNAUTHORIZED,
      };
    }

    user.password = null;
    const payload = { sub: user };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });

    const userResource = new UserResource(user).toArray();
    return {
      data: {
        user: userResource,
        token,
      },
      code: 'S1000',
      status: HttpStatus.OK,
    };
  }
  async findUserByUsername(username: string) {
    return this.userModel.findOne({
      where: { username },
      include: [RoleModel],
    });
  }
}
