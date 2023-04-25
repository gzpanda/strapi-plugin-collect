"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
exports.default = ({ strapi }) => ({
    async getAllSources(ctx) {
        try {
            const sources = await strapi
                .plugin('collect')
                .service('collect')
                .getAllSource();
            ctx.body = sources;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
    async createClass(ctx) {
        const { params } = ctx.request;
        try {
            const source = await strapi
                .plugin('collect')
                .service('collect')
                .getSourceById(params.id);
            if (!source) {
                return (ctx.body = { errors: 'Source not found - Class Controller' });
            }
            if (!source.publishedAt) {
                return (ctx.body = {
                    erros: 'Source has not been published - Class Controller',
                });
            }
            if (source.class) {
                return (ctx.body = {
                    errors: 'Class has been generated - Class Controller',
                });
            }
            // TODO add exec collect vod list
            // exec(
            //   'collect vod list --sourceid=' + params.id,
            //   (error, stdout, stderr) => {
            //     if (error) {
            //       console.error(`exec error: ${error}`);
            //       return;
            //     }
            //     console.log(`stdout: ${stdout}`);
            //     console.error(`stderr: ${stderr}`);
            //   }
            // );
            (0, node_child_process_1.execSync)('collect vod list --sourceid=' + params.id);
            const result = await strapi
                .plugin('collect')
                .service('collect')
                .updateSource(params.id);
            ctx.body = result;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
    async createVideoAll(ctx) {
        const { params } = ctx.request;
        try {
            const source = await strapi
                .plugin('collect')
                .service('collect')
                .getSourceById(params.id);
            if (!source) {
                return (ctx.body = { errors: 'Source not found - Class Controller' });
            }
            if (!source.publishedAt) {
                return (ctx.body = {
                    erros: 'Source has not been published - Class Controller',
                });
            }
            if (!source.class) {
                return (ctx.body = {
                    errors: 'Class has not been generated - Class Controller',
                });
            }
            // exec(
            //   'collect vod detail --sourceid=' + params.id,
            //   (error, stdout, stderr) => {
            //     if (error) {
            //       console.error(`exec error: ${error}`);
            //       return;
            //     }
            //     console.log(`stdout: ${stdout}`);
            //     console.error(`stderr: ${stderr}`);
            //   }
            // );
            (0, node_child_process_1.exec)('collect vod detail --sourceid=' + params.id);
            ctx.body = source;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
    async createVideoWeekend(ctx) {
        const { params } = ctx.request;
        try {
            const source = await strapi
                .plugin('collect')
                .service('collect')
                .getSourceById(params.id);
            if (!source) {
                return (ctx.body = { errors: 'Source not found - Class Controller' });
            }
            if (!source.publishedAt) {
                return (ctx.body = {
                    erros: 'Source has not been published - Class Controller',
                });
            }
            if (!source.class) {
                return (ctx.body = {
                    errors: 'Class has not been generated - Class Controller',
                });
            }
            // exec(
            //   'collect vod detail --sourceid=' + params.id + ' --interval=168',
            //   (error, stdout, stderr) => {
            //     if (error) {
            //       console.error(`exec error: ${error}`);
            //       return;
            //     }
            //     console.log(`stdout: ${stdout}`);
            //     console.error(`stderr: ${stderr}`);
            //   }
            // );
            (0, node_child_process_1.exec)('collect vod detail --sourceid=' + params.id + ' --interval=168');
            ctx.body = source;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
    async createVideo24Hour(ctx) {
        const { params } = ctx.request;
        try {
            const source = await strapi
                .plugin('collect')
                .service('collect')
                .getSourceById(params.id);
            if (!source) {
                return (ctx.body = { errors: 'Source not found - Class Controller' });
            }
            if (!source.publishedAt) {
                return (ctx.body = {
                    erros: 'Source has not been published - Class Controller',
                });
            }
            if (!source.class) {
                return (ctx.body = {
                    errors: 'Class has not been generated - Class Controller',
                });
            }
            // exec(
            //   'collect vod detail --sourceid=' + params.id + ' --interval=24',
            //   (error, stdout, stderr) => {
            //     if (error) {
            //       console.error(`exec error: ${error}`);
            //       return;
            //     }
            //     console.log(`stdout: ${stdout}`);
            //     console.error(`stderr: ${stderr}`);
            //   }
            // );
            (0, node_child_process_1.exec)('collect vod detail --sourceid=' + params.id + ' --interval=24');
            ctx.body = source;
        }
        catch (e) {
            ctx.throw(500, e);
        }
    },
});
