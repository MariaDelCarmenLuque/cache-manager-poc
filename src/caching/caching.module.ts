import { Module } from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [CacheManagerService],
  imports: [CacheModule.register()],
})
export class CachingModule {}
