import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AttachmentDto } from 'src/attachments/attachment.dto';

@Injectable()
export class CacheManagerService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCacheData(key: string) {
    try {
      return this.cacheManager.get(key);
    } catch (error) {
      console.log('Error get cache data', error);
    }
  }

  async setCacheData(key: string, value: AttachmentDto[], expires: number) {
    try {
      await this.cacheManager.set(key, value, expires);
    } catch (error) {
      console.log('Error set cache data', error);
    }
  }
}
