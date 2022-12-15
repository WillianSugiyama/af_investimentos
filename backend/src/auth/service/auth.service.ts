import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(user: User): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (foundUser) {
      throw new HttpException('User already exists', 400);
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return await this.userRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { username },
    });

    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { ...result } = foundUser;
        return { ...result, fullName: foundUser.fullName };
      }

      return null;
    }
    return null;
  }
  async login(username: string, password: any) {
    const validateUser = await this.validateUser(username, password);

    if (!validateUser) {
      throw new HttpException('Invalid credentials', 401);
    }

    const payload = {
      username,
      id: validateUser.id,
      userId: validateUser.id,
      fullName: validateUser.fullName,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
