import { Controller, Get, UseGuards, Req, Res, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const result = await this.authService.validateGoogleToken(req.user.credential);
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.token}`);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {
    // Guard redirects to Facebook
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthCallback(@Req() req, @Res() res: Response) {
    const result = await this.authService.validateFacebookToken(req.user.accessToken);
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.token}`);
  }

  @Post('register')
  async register(
    @Body() userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      username: string;
    }
  ) {
    return this.authService.register(userData);
  }

  @Post('google')
  @HttpCode(HttpStatus.OK)
  async googleAuthPost(@Body('credential') credential: string) {
    return this.authService.validateGoogleToken(credential);
  }

  @Post('facebook')
  @HttpCode(HttpStatus.OK)
  async facebookAuthPost(@Body('accessToken') accessToken: string) {
    return this.authService.validateFacebookToken(accessToken);
  }

  @Get('verify')
  @UseGuards(AuthGuard('jwt'))
  async verifyToken(@Req() req) {
    return { user: req.user };
  }
} 