import { Body, Controller, Get, Post } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get('/all')
  async getAttachments() {
    return this.attachmentsService.listAttachments();
  }

  @Post('/integrations')
  async getIntegrationsAttachments(@Body() input: { ids: string[] }) {
    return this.attachmentsService.listAttachmentsByIntegrations(input.ids);
  }

  @Post('/tags')
  async getTagsAttachments(@Body() input: { ids: string[] }) {
    return this.attachmentsService.listAttachmentsByTags(input.ids);
  }
}
