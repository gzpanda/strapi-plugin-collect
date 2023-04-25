import collectService from './collect-service';
import cronJob from './cronjob-service';
import validation from './validation';

export default {
  collect: collectService,
  'cron-job': cronJob,
  validation: validation,
};
