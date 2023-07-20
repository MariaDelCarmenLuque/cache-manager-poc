import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CachingModule } from './caching/caching.module';
import { AttachmentsModule } from './attachments/attachments.module';

@Module({
  imports: [CachingModule, AttachmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
