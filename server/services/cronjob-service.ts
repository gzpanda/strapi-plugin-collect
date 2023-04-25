import { Strapi } from '@strapi/strapi';
import { CronJobInputData } from '../../types';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll() {
    return strapi.entityService.findMany('plugin::collect.cron-job');
  },

  async getOne(id: number) {
    return strapi.entityService.findOne('plugin::collect.cron-job', id);
  },

  async getPublished() {
    return strapi.entityService.findMany('plugin::collect.cron-job', {
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
    });
  },

  async create(data: CronJobInputData) {
    return strapi.entityService.create('plugin::collect.cron-job', {
      data,
    });
  },

  async update(id: number, data: CronJobInputData) {
    return strapi.entityService.update('plugin::collect.cron-job', id, {
      data,
    });
  },

  async delete(id: number) {
    return strapi.entityService.delete('plugin::collect.cron-job', id);
  },
});
