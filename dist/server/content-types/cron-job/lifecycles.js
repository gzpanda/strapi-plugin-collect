"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("../../cron");
exports.default = {
    afterUpdate({ result: cronJob }) {
        cron_1.cron.updateJob(cronJob);
    },
    afterDelete({ result: cronJob }) {
        cron_1.cron.deleteJob(cronJob);
    },
};
