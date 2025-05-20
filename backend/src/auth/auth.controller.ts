import { Controller, Get, UseGuards, Req, Res, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
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
    const result = await this.authService.validateGoogleUser(req.user);
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.access_token}`);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {
    // Guard redirects to Facebook
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthCallback(@Req() req, @Res() res: Response) {
    const result = await this.authService.validateFacebookUser(req.user);
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.access_token}`);
  }

  @Post('google')
  @HttpCode(HttpStatus.OK)
  async googleAuthPost(@Body() body: { credential: string }) {
    return this.authService.validateGoogleToken(body.credential);
  }

  @Post('facebook')
  @HttpCode(HttpStatus.OK)
  async facebookAuthPost(@Body() body: { accessToken: string }) {
    return this.authService.validateFacebookToken(body.accessToken);
  }
} 