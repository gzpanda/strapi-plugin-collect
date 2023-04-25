//@ts-nocheck
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  BaseHeaderLayout,
  ContentLayout,
  Box,
  Link,
} from '@strapi/design-system';
import { ArrowLeft } from '@strapi/icons';
import { NotFound } from '../../components/NotFound';
import { getResponseErrors } from '../../utils/getResponseErrors';
import { pluginBasePath } from '../../utils/plugin';
import { collect } from '../../api/collect';
import { CronJobForm } from '../../components/CronJobForm';

const EditCronJobPage = () => {
  const location = useLocation();
  const cronJob = location.state?.cronJob;
  const history = useHistory();

  if (!cronJob) {
    return <NotFound />;
  }

  async function handleFormSubmit({ input, setErrors }) {
    try {
      await collect.updateCronJob(cronJob.id, input);
      history.push(`${pluginBasePath}/cron`);
    } catch (error) {
      const errors = getResponseErrors(error.response);
      setErrors(errors);
    }
  }

  return (
    <div>
      <Box background="neutral100">
        <BaseHeaderLayout
          title="Edit cron job"
          as="h2"
          navigationAction={
            <Link startIcon={<ArrowLeft />} to={`${pluginBasePath}/cron`}>
              Go back
            </Link>
          }
        />
      </Box>
      <ContentLayout>
        <CronJobForm initialData={cronJob} handleSubmit={handleFormSubmit} />
      </ContentLayout>
    </div>
  );
};

export default EditCronJobPage;
