import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: any): Promise<{
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
    }>;
}
export {};
