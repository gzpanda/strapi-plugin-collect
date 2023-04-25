import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllSource() {
    return strapi.entityService.findMany('plugin::collect.collect-source', {
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
    });
  },

  // 从数据库中获取指定 id 的数据源
  async getSourceById(id: number) {
    return strapi.entityService.findOne('plugin::collect.collect-source', id);
  },

  async updateSource(id: number) {
    return strapi.entityService.update('plugin::collect.collect-source', id, {
      data: {
        class: true,
      },
    });
  },
});
