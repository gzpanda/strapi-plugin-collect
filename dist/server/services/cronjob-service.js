"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async getAll() {
        return strapi.entityService.findMany('plugin::collect.cron-job');
    },
    async getOne(id) {
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
    async create(data) {
        return strapi.entityService.create('plugin::collect.cron-job', {
            data,
        });
    },
    async update(id, data) {
        return strapi.entityService.update('plugin::collect.cron-job', id, {
            data,
        });
    },
    async delete(id) {
        return strapi.entityService.delete('plugin::collect.cron-job', id);
    },
});
