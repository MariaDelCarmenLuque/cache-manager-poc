import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheManagerService } from 'src/caching/cache-manager.service';

@Module({
  providers: [AttachmentsService, CacheManagerService],
  controllers: [AttachmentsController],
  imports: [CacheModule.register()],
})
export class AttachmentsModule {}
