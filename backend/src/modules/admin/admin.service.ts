import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminService {
  private readonly tokens = new Set<string>();

  private generateToken() {
    return (
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2) +
      Date.now().toString(36)
    );
  }

  login(password: string) {
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';
    if (password !== adminPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.generateToken();
    this.tokens.add(token);

    setTimeout(() => {
      this.tokens.delete(token);
    }, 24 * 60 * 60 * 1000);

    return { token, message: 'Login successful' };
  }

  verify(token?: string) {
    if (!token || !this.tokens.has(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    return { valid: true };
  }

  logout(token?: string) {
    if (token) {
      this.tokens.delete(token);
    }
    return { message: 'Logged out successfully' };
  }
}
