import { Controller, Body, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import type { Response } from 'express';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post()
    async signIn(@Res({passthrough: true}) res:Response ,@Body() signInDto:SignInDto){
        const token = await this.authService.signIn(signInDto.email, signInDto.password);
        res.cookie('jwt', token.accessToken, {
            httpOnly: true,    // cannot be accessed with JS
            secure: this.authService.isProd() ? true : false,      // only over HTTPS (set false for local dev)
            sameSite: 'strict', // CSRF protection
            maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
        });

        return { message: 'Logged in successfully' };
    }
}
