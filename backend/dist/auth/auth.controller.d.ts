import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any, res: Response): Promise<void>;
    facebookAuth(): Promise<void>;
    facebookAuthCallback(req: any, res: Response): Promise<void>;
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
    googleAuthPost(credential: string): Promise<{
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
    facebookAuthPost(accessToken: string): Promise<{
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
    verifyToken(req: any): Promise<{
        user: any;
    }>;
}
