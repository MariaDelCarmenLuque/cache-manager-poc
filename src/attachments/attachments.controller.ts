import { Controller, Get } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get('/all')
  async getAttachments() {
    return this.attachmentsService.listAttachments();
  }

  @Get('/integrations')
  async getIntegrationsAttachments() {
    return this.attachmentsService.listAttachmentsByIntegrations(['a', 'b']);
  }

  @Get('/tags')
  async getTagsAttachments() {
    return this.attachmentsService.listAttachmentsByTags([
      'f',
      'g',
      'h',
      'i',
      'j',
    ]);
  }
}
