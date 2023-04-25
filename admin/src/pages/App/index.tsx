/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { pluginBasePath } from '../../utils/plugin';
import { NotFound } from '../../components/NotFound';
import HomePage from '../HomePage';
import CronPage from '../CronPage';
import NewCronJobPage from '../NewCronJobPage';
import EditCronJobPage from '../EditCronJobPage';
import { CronJobDetails } from '../../components/CronJobDetails';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`${pluginBasePath}`} component={HomePage} exact />
        <Route path={`${pluginBasePath}/cron`} component={CronPage} exact />
        <Route
          path={`${pluginBasePath}/cron-jobs/create`}
          component={NewCronJobPage}
          exact
        />
        <Route
          path={`${pluginBasePath}/cron-jobs/edit/:id`}
          component={EditCronJobPage}
          exact
        />
        <Route
          path={`${pluginBasePath}/cron-jobs/:id`}
          component={CronJobDetails}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
