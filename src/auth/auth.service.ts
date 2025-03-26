import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service'; 
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
      ) {}
      async login(loginDto: any) {
        const { username, password } = loginDto;
        const user = await this.usersService.findByUsername(username);
    
        if (!user || user.password !== password) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
