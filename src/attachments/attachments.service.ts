import { Injectable } from '@nestjs/common';
import { attachments } from './seed';
import { CacheManagerService } from 'src/caching/cache-manager.service';
import { CachePrefix } from 'src/caching/cache-prefix.enum';
import { AttachmentDto } from './attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(private readonly cacheManagerService: CacheManagerService) {}

  async listAttachments() {
    const listAttachments = attachments;
    return listAttachments;
  }
  async listAttachmentsByIntegrations(integrationIds: string[]) {
    const cacheAttachments: AttachmentDto[] = [];
    const cacheMisses: string[] = [];
    for (const id of integrationIds) {
      const att = await this.cacheManagerService.getCacheData(
        `${CachePrefix.INTEGRATION_ATT}_${id}`,
      );
      if (att) {
        cacheAttachments.push(att as AttachmentDto);
      } else {
        cacheMisses.push(id);
      }
    }
    console.log('Busco los attachments en cache');

    if (cacheAttachments.length === integrationIds.length) {
      console.log('Encontre todos los attachment en el cache , los retorno');
      return cacheAttachments;
    }

    console.log('Hago la consulta para las attachments no encontrados');
    const attachmentsByIntegrations = attachments.filter((attachment) =>
      cacheMisses.includes(attachment.integrationId),
    );
    for (const id of cacheMisses) {
      await this.cacheManagerService.setCacheData(
        `${CachePrefix.INTEGRATION_ATT}_${id}`,
        attachmentsByIntegrations.filter(
          (attachment) => attachment.integrationId === id,
        ),
        15000,
      );
    }
    console.log('Almaceno los attachments en cache');
    console.log('Retorne attachments de query');
    return [...attachmentsByIntegrations, ...cacheAttachments];
  }

  async listAttachmentsByTags(tagIds: string[]) {
    const attachmentsByTags = attachments.filter((attachment) =>
      tagIds.includes(attachment.tagId),
    );
    return attachmentsByTags;
  }
}
