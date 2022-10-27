import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    if (username === 'atom.hu' && pass === '123456') {
      return {
        name: 'atom.hu',
        age: 18,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      id: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
