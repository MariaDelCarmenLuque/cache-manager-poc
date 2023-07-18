import { Module } from '@nestjs/common';
import { CacheManagerController } from './cache-manager.controller';
import { CacheManagerService } from './cache-manager.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [CacheManagerController],
  providers: [CacheManagerService],
  imports: [CacheModule.register()],
})
export class CachingModule {}
