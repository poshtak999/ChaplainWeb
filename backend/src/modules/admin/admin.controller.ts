import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AdminLoginDto } from './dto/login.dto';
import { AdminService } from './admin.service';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  login(@Body() dto: AdminLoginDto) {
    return this.adminService.login(dto.password);
  }

  @Get('verify')
  verify(@Headers('authorization') authorization?: string) {
    const token = authorization?.replace('Bearer ', '');
    return this.adminService.verify(token);
  }

  @Post('logout')
  logout(@Headers('authorization') authorization?: string) {
    const token = authorization?.replace('Bearer ', '');
    return this.adminService.logout(token);
  }
}
