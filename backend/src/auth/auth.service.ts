import { Injectable, UseGuards } from '@nestjs/common';
import { UpdateAuthInput } from './dto/update-auth.input';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginInput } from 'src/user/dto/create-user.input';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Response, Request } from 'express';
import { Auth, LogoutResponse } from './entities/auth.entity';
import { GqlAuthGuard } from './gqlAuthGuard';
import { AuthGuard } from '@nestjs/passport';
import { SignInInput } from './dto/create-auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserEntity): Promise<{ access_token: string }> {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      workspaceName: user.workspace,
      name: user.firstname,
      lastname: user.lastname,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn({ email, password }: LoginInput): Promise<{
    user: Omit<UserEntity, 'password'>;
    token: string;
  } | null> {
    const normalizedEmail = email.toLowerCase();
    const user = await this.userService.findByEmail(normalizedEmail);
    if (!user) return null;

    if (user.status === 'ARCHIVED') {
      throw new Error('Ce compte à été désactivé');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) return null;

    // const payload = {
    //   sub: user.id,
    //   email: user.email,
    //   workspace: user.workspace?.id,
    // };

    if (!user.workspace) {
      throw new Error('Aucun workspace associé à cet utilisateur');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      workspaceId: user.workspace.id,
    };

    const token = await this.jwtService.signAsync(payload);

    const { password: _, ...safeUser } = user;

    return {
      user: safeUser as Omit<UserEntity, 'password'>,
      token,
    };
  }

  async logout(req: Request, res: Response): Promise<LogoutResponse> {
    let email: string | null = null;
    const token = req.cookies?.jwt;

    if (token) {
      const decoded = this.jwtService.verify(token) as { email?: string };
      email = decoded.email ?? null;
    }

    res.clearCookie('jwt');

    return {
      message: 'Déconnexion réussie',
      // user_email: email,
    };
  }

  async register(createAuthInput: SignInInput): Promise<Auth> {
    const user = await this.userService.create(createAuthInput);

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        id: user.id,
      },
      process.env.SECRET_KEY ||
        '71509c20e99e3cc7f81435d3cbbf22c571181a4a57b2b08f95c3aa4883783cec',
      {
        expiresIn: '2h',
        algorithm: 'HS256',
      },
    );

    return {
      user,
      access_token: token,
      message: 'Utilisateur enregistré avec succès',
    };
  }
}
