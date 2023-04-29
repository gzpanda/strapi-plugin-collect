"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const node_fs_1 = __importDefault(require("node:fs"));
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
            (0, node_child_process_1.execSync)('collect vod list --sourceid=' + params.id);
            const result = await strapi
                .plugin('collect')
                .service('collect')
                .updateClassSource(params.id);
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
            if (source.all) {
                return (ctx.body = {
                    errors: 'This source has been all vods - Class Controller',
                });
            }
            const logPath = './logs/';
            if (!node_fs_1.default.existsSync(logPath)) {
                node_fs_1.default.mkdirSync(logPath);
            }
            const logFile = logPath + 'vod-detail-all-' + params.id + '.log';
            const errLogFile = logPath + 'vod-detail-all-' + params.id + '-error.log';
            // fs.openSync(logFile, 'w');
            // fs.openSync(errLogFile, 'w');
            (0, node_child_process_1.spawn)('collect', ['vod', 'detail', '--sourceid=' + params.id], {
                detached: true,
                stdio: [
                    'ignore',
                    node_fs_1.default.openSync(logFile, 'w'),
                    node_fs_1.default.openSync(errLogFile, 'w'),
                ],
            });
            const result = await strapi
                .plugin('collect')
                .service('collect')
                .updateAllSource(params.id);
            ctx.body = result;
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
