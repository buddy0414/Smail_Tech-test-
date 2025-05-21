import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
  }) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: userData.email },
          { username: userData.username }
        ]
      }
    });

    if (existingUser) {
      throw new ConflictException('User with this email or username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        provider: 'LOCAL'
      }
    });

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async validateGoogleToken(credential: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Invalid Google token');
      }

      // Find or create user
      let user = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: payload.email,
            firstName: payload.given_name,
            lastName: payload.family_name,
            picture: payload.picture,
            provider: 'GOOGLE',
          },
        });
      }

      // Generate JWT token
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });

      return {
        user,
        token,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  async validateFacebookToken(accessToken: string) {
    try {
      // Verify token with Facebook
      const response = await axios.get(
        `https://graph.facebook.com/me?fields=id,email,first_name,last_name,picture&access_token=${accessToken}`
      );

      const { id, email, first_name, last_name, picture } = response.data;

      if (!email) {
        throw new UnauthorizedException('Email not provided by Facebook');
      }

      // Find or create user
      let user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email,
            firstName: first_name,
            lastName: last_name,
            picture: picture?.data?.url,
            provider: 'FACEBOOK',
            facebookId: id,
          },
        });
      }

      // Generate JWT token
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });

      return {
        user,
        token,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Facebook token');
    }
  }
} 