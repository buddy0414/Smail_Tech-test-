import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any, res: Response): Promise<void>;
    facebookAuth(): Promise<void>;
    facebookAuthCallback(req: any, res: Response): Promise<void>;
    googleAuthPost(body: {
        credential: string;
    }): Promise<{
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
    facebookAuthPost(body: {
        accessToken: string;
    }): Promise<{
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
