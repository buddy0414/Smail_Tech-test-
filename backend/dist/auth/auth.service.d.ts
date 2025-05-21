import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private googleClient;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateGoogleToken(credential: string): Promise<{
        user: {
            id: string;
            email: string;
            username: string | null;
            googleId: string | null;
            facebookId: string | null;
            firstName: string | null;
            lastName: string | null;
            password: string | null;
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
            username: string | null;
            googleId: string | null;
            facebookId: string | null;
            firstName: string | null;
            lastName: string | null;
            password: string | null;
            provider: string | null;
            picture: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
}
