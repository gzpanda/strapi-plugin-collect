"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
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
    async getSourceById(id) {
        return strapi.entityService.findOne('plugin::collect.collect-source', id);
    },
    async updateClassSource(id) {
        return strapi.entityService.update('plugin::collect.collect-source', id, {
            data: {
                class: true,
            },
        });
    },
    async updateAllSource(id) {
        return strapi.entityService.update('plugin::collect.collect-source', id, {
            data: {
                all: true,
            },
        });
    },
});
