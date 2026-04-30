import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { LegacyModule } from './modules/legacy/legacy.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, LegacyModule, AdminModule],
})
export class AppModule {}
