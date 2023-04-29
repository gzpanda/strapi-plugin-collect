"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'GET',
        path: '/sources',
        handler: 'collect.getAllSources',
        config: {
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/sources/createclass/:id',
        handler: 'collect.createClass',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/sources/createVideoAll/:id',
        handler: 'collect.createVideoAll',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/sources/createVideoWeekend/:id',
        handler: 'collect.createVideoWeekend',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/sources/createVideo24Hour/:id',
        handler: 'collect.createVideo24Hour',
        config: {
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/cron-jobs',
        handler: 'cron.getAll',
        config: {
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/cron-jobs/:id',
        handler: 'cron.getOne',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/cron-jobs',
        handler: 'cron.create',
        config: {
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/cron-jobs/:id',
        handler: 'cron.update',
        config: {
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/cron-jobs/publish/:id',
        handler: 'cron.publish',
        config: {
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/cron-jobs/unpublish/:id',
        handler: 'cron.unpublish',
        config: {
            policies: [],
        },
    },
    {
        method: 'DELETE',
        path: '/cron-jobs/:id',
        handler: 'cron.delete',
        config: {
            policies: [],
        },
    },
];
