"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
exports.default = {
    validateCronJobData(data) {
        const validation = schema_1.CronJobSchema.safeParse(data);
        if (!validation.success) {
            return { errors: validation['error'].issues };
        }
        return { errors: null };
    },
};
