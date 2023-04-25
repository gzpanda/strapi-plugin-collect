import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Button,
  Box,
  Link,
} from '@strapi/design-system';
import { Plus, ArrowLeft } from '@strapi/icons';
import { LoadingIndicatorPage } from '@strapi/helper-plugin';
import { CronJobsList } from '../../components/CronJobsList';
import { pluginBasePath } from '../../utils/plugin';
import { collect } from '../../api/collect';
import { CronJob } from '../../../../types';

const CronPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const history = useHistory();

  useEffect(() => {
    fetchCronJobs();
  }, []);

  async function fetchCronJobs() {
    const { data } = await collect.getAllCronJobs();
    setCronJobs(data);
    setIsLoading(false);
  }

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <div>
      <Box background="neutral100">
        <BaseHeaderLayout
          title="Cron Jobs"
          as="h2"
          navigationAction={
            <Link startIcon={<ArrowLeft />} to={`${pluginBasePath}`}>
              Go back
            </Link>
          }
          primaryAction={
            <Button
              startIcon={<Plus />}
              onClick={() => history.push(`${pluginBasePath}/cron-jobs/create`)}
            >
              Add new cron job
            </Button>
          }
        />
      </Box>
      <ContentLayout>
        {cronJobs.length === 0 ? (
          <EmptyStateLayout content="You don't have any cron jobs yet..." />
        ) : (
          <CronJobsList cronJobs={cronJobs} fetchCronJobs={fetchCronJobs} />
        )}
      </ContentLayout>
    </div>
  );
};

export default CronPage;
