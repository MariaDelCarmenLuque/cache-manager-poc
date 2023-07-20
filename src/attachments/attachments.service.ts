import { Injectable } from '@nestjs/common';
import { attachments } from './seed';
import { CacheManagerService } from 'src/caching/cache-manager.service';

@Injectable()
export class AttachmentsService {
  constructor(private readonly cacheManagerService: CacheManagerService) {}

  async listAttachments() {
    const listAttachments = attachments;
    return listAttachments;
  }
  async listAttachmentsByIntegrations(integrationIds: string[]) {
    const cacheAttachments = [];
    for (const id of integrationIds) {
      const att = await this.cacheManagerService.getCacheData(
        `integration_att_${id}`,
      );
      if (att) {
        cacheAttachments.push(att);
      }
    }
    console.log('Busco los attachments en cache');

    if (cacheAttachments.length > 0) {
      console.log('Retorno attachments del cache');
      return cacheAttachments;
    }

    const attachmentsByIntegrations = attachments.filter((attachment) =>
      integrationIds.includes(attachment.integrationId),
    );
    console.log('No se encontraron coincidencias, hago la consulta a la db')
    for (const id of integrationIds) {
      await this.cacheManagerService.setCacheData(
        `integration_att_${id}`,
        attachmentsByIntegrations.filter(
          (attachment) => attachment.integrationId === id,
        ),
        5000,
      );
    }
    console.log('Almaceno los attachments en cache');
    console.log('Retorne attachments de query');
    return attachmentsByIntegrations;
  }

  async listAttachmentsByTags(tagIds: string[]) {
    const attachmentsByTags = attachments.filter((attachment) =>
      tagIds.includes(attachment.tagId),
    );
    return attachmentsByTags;
  }
}
