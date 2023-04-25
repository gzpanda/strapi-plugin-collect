"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const collect_controller_1 = __importDefault(require("./collect-controller"));
const cronjob_controller_1 = __importDefault(require("./cronjob-controller"));
exports.default = {
    collect: collect_controller_1.default,
    cron: cronjob_controller_1.default,
};
