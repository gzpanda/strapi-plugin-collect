//@ts-nocheck
import nodeSchedule from 'node-schedule';
import { exec } from 'node:child_process';
import { CronJob } from '../../types';

export const createCronJobCallback = async (cronJob: CronJob) => {
  let { iterationsLimit, iterationsCount } = cronJob;
  const hasLimitedIterations = iterationsLimit > -1;
  const command = cronJob.command;

  return function () {
    if (hasLimitedIterations && iterationsCount >= iterationsLimit) {
      nodeSchedule.scheduledJobs[cronJob.name].cancel();
      return;
    }

    exec(command, (error, stdout, stderr) => {
      let endTime = new Date().toLocaleString() + '\n';
      let stdOutputData = '';
      if (error) {
        stdOutputData = endTime + error.message;
      }

      if (stdout) {
        stdOutputData = endTime + stdout;
      }

      if (stderr) {
        stdOutputData = endTime + stderr;
      }
      // let stdOutputData = endTime + error?.message + stdout;
      // console.log(stdOutputData);
      updateLatestExecutionLog(cronJob.id, stdOutputData);
      if (hasLimitedIterations) {
        updateCronJobIterationsCount(cronJob.id, ++iterationsCount);
      }
      // if (error) {
      //   console.log(error);

      //   console.error(`exec error: ${error}`);
      //   return;
      // }
      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
    });
  };
};

function updateCronJobIterationsCount(id: number, iterationsCount: number) {
  strapi.plugin('collect').service('cron-job').update(id, {
    iterationsCount,
  });
}

function updateLatestExecutionLog(id: number, latestExecutionLog: object) {
  strapi.plugin('collect').service('cron-job').update(id, {
    latestExecutionLog,
  });
}
