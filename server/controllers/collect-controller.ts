import { exec, execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllSources(ctx: any) {
    try {
      const sources = await strapi
        .plugin('collect')
        .service('collect')
        .getAllSource();
      ctx.body = sources;
    } catch (e) {
      ctx.throw(500, e);
    }
  },

  async createClass(ctx: any) {
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

      execSync('collect vod list --sourceid=' + params.id);

      const result = await strapi
        .plugin('collect')
        .service('collect')
        .updateClassSource(params.id);

      ctx.body = result;
    } catch (e) {
      ctx.throw(500, e);
    }
  },

  async createVideoAll(ctx: any) {
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

      if (!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath);
      }

      const logFile = logPath + 'vod-detail-all-' + params.id + '.log';
      const errLogFile = logPath + 'vod-detail-all-' + params.id + '-error.log';

      // fs.openSync(logFile, 'w');
      // fs.openSync(errLogFile, 'w');

      spawn('collect', ['vod', 'detail', '--sourceid=' + params.id], {
        detached: true,
        stdio: [
          'ignore',
          fs.openSync(logFile, 'w'),
          fs.openSync(errLogFile, 'w'),
        ],
      });

      const result = await strapi
        .plugin('collect')
        .service('collect')
        .updateAllSource(params.id);

      ctx.body = result;
    } catch (e) {
      ctx.throw(500, e);
    }
  },

  async createVideoWeekend(ctx: any) {
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

      exec('collect vod detail --sourceid=' + params.id + ' --interval=168');

      ctx.body = source;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
  async createVideo24Hour(ctx: any) {
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

      exec('collect vod detail --sourceid=' + params.id + ' --interval=24');

      ctx.body = source;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
});
