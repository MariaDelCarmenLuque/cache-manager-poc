import { Injectable } from '@nestjs/common';
import { attachments } from './seed';

@Injectable()
export class AttachmentsService {
  async listAttachments() {
    const listAttachments = attachments;
    return listAttachments;
  }
  async listAttachmentsByIntegrations(integrationIds: string[]) {
    const attachmentsByIntegrations = attachments.filter((attachment) =>
      integrationIds.includes(attachment.integrationId),
    );
    return attachmentsByIntegrations;
  }

  async listAttachmentsByTags(tagIds: string[]) {
    const attachmentsByTags = attachments.filter((attachment) =>
      tagIds.includes(attachment.tagId),
    );
    return attachmentsByTags;
  }
}
