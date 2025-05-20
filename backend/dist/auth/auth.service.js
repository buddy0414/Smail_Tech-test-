"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
const axios_1 = require("axios");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
    async validateGoogleToken(credential) {
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                throw new common_1.UnauthorizedException('Invalid Google token');
            }
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
            const token = this.jwtService.sign({
                sub: user.id,
                email: user.email,
            });
            return {
                user,
                token,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid Google token');
        }
    }
    async validateFacebookToken(accessToken) {
        var _a;
        try {
            const response = await axios_1.default.get(`https://graph.facebook.com/me?fields=id,email,first_name,last_name,picture&access_token=${accessToken}`);
            const { id, email, first_name, last_name, picture } = response.data;
            if (!email) {
                throw new common_1.UnauthorizedException('Email not provided by Facebook');
            }
            let user = await this.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                user = await this.prisma.user.create({
                    data: {
                        email,
                        firstName: first_name,
                        lastName: last_name,
                        picture: (_a = picture === null || picture === void 0 ? void 0 : picture.data) === null || _a === void 0 ? void 0 : _a.url,
                        provider: 'FACEBOOK',
                        facebookId: id,
                    },
                });
            }
            const token = this.jwtService.sign({
                sub: user.id,
                email: user.email,
            });
            return {
                user,
                token,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid Facebook token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map