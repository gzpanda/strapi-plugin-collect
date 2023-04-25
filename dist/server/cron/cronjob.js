"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCronJobCallback = void 0;
//@ts-nocheck
const node_schedule_1 = __importDefault(require("node-schedule"));
const node_child_process_1 = require("node:child_process");
const createCronJobCallback = async (cronJob) => {
    let { iterationsLimit, iterationsCount } = cronJob;
    const hasLimitedIterations = iterationsLimit > -1;
    const command = cronJob.command;
    return function () {
        if (hasLimitedIterations && iterationsCount >= iterationsLimit) {
            node_schedule_1.default.scheduledJobs[cronJob.name].cancel();
            return;
        }
        (0, node_child_process_1.exec)(command, (error, stdout, stderr) => {
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
exports.createCronJobCallback = createCronJobCallback;
function updateCronJobIterationsCount(id, iterationsCount) {
    strapi.plugin('collect').service('cron-job').update(id, {
        iterationsCount,
    });
}
function updateLatestExecutionLog(id, latestExecutionLog) {
    strapi.plugin('collect').service('cron-job').update(id, {
        latestExecutionLog,
    });
}
