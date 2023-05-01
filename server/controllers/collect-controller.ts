import { exec, execSync, spawn } from 'node:child_process';
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

      spawn('collect', ['vod', 'detail', '--sourceid=' + params.id], {
        detached: true,
        stdio: ['ignore'],
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

      // exec('collect vod detail --sourceid=' + params.id + ' --interval=168');
      spawn(
        'collect',
        ['vod', 'detail', '--interval=168', '--sourceid=' + params.id],
        {
          detached: true,
          stdio: ['ignore'],
        }
      );

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

      // exec('collect vod detail --sourceid=' + params.id + ' --interval=24');
      spawn(
        'collect',
        ['vod', 'detail', '--interval=24', '--sourceid=' + params.id],
        {
          detached: true,
          stdio: ['ignore'],
        }
      );

      ctx.body = source;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
});
