"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const collect_service_1 = __importDefault(require("./collect-service"));
const cronjob_service_1 = __importDefault(require("./cronjob-service"));
const validation_1 = __importDefault(require("./validation"));
exports.default = {
    collect: collect_service_1.default,
    'cron-job': cronjob_service_1.default,
    validation: validation_1.default,
};
