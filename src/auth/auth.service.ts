import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService, private configService:ConfigService){}

    getSecret() {
        return this.configService.get<string>('JWT_SECRET');
    }

    isProd() {
        return this.configService.get<string>('NODE_ENV') === 'production';
    }

    async signIn(email: string, password: string): Promise<{accessToken: string}>{
        const user = await this.userService.findOneByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, email: user.email };
        return {accessToken: await this.jwtService.signAsync(payload)};
    }
}
