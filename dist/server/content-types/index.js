"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const collect_source_1 = __importDefault(require("./collect-source"));
const collect_class_1 = __importDefault(require("./collect-class"));
const cron_job_1 = __importDefault(require("./cron-job"));
exports.default = {
    'collect-source': collect_source_1.default,
    'collect-class': collect_class_1.default,
    'cron-job': cron_job_1.default,
};
