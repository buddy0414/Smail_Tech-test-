import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private googleClient;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        username: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            username: string | null;
            googleId: string | null;
            facebookId: string | null;
            provider: string | null;
            picture: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    validateGoogleToken(credential: string): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            username: string | null;
            password: string | null;
            googleId: string | null;
            facebookId: string | null;
            provider: string | null;
            picture: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    validateFacebookToken(accessToken: string): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            username: string | null;
            password: string | null;
            googleId: string | null;
            facebookId: string | null;
            provider: string | null;
            picture: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
}
