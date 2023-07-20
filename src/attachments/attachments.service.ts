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
      console.log('Busco attachment en cache : id ', id, att);
      if (att) {
        cacheAttachments.push(att as AttachmentDto);
        console.log('Se encontro en cache attachment id : ', id);
      } else {
        cacheMisses.push(id);
        console.log('No se encontro en cache attachment id : ', id);
      }
    }

    if (cacheAttachments.length === integrationIds.length) {
      console.log('Encontre todos los attachment en el cache , los retorno');
      console.log('----------');
      return cacheAttachments;
    }

    console.log(
      'Hago la consulta para las attachments no encontrados ids : ',
      cacheMisses,
    );
    const attachmentsByIntegrations = attachments.filter((attachment) =>
      cacheMisses.includes(attachment.integrationId),
    );
    for (const id of cacheMisses) {
      await this.cacheManagerService.setCacheData(
        `${CachePrefix.INTEGRATION_ATT}_${id}`,
        attachmentsByIntegrations.filter(
          (attachment) => attachment.integrationId === id,
        ),
        100000,
      );
      console.log('Almaceno en cache attachment id : ', id);
    }
    console.log('Retorno attachments de cache y de la consulta');
    console.log('----------');
    return [...attachmentsByIntegrations, ...cacheAttachments];
  }

  async listAttachmentsByTags(tagIds: string[]) {
    const attachmentsByTags = attachments.filter((attachment) =>
      tagIds.includes(attachment.tagId),
    );
    return attachmentsByTags;
  }
}
