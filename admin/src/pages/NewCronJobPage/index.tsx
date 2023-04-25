//@ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  BaseHeaderLayout,
  ContentLayout,
  Box,
  Link,
} from '@strapi/design-system';
import { ArrowLeft } from '@strapi/icons';
import { CronJobForm } from '../../components/CronJobForm';
import { pluginBasePath } from '../../utils/plugin';
import { getResponseErrors } from '../../utils/getResponseErrors';
import { collect } from '../../api/collect';

const NewCronJobPage = () => {
  const history = useHistory();

  async function handleFormSubmit({ input, setErrors }) {
    try {
      await collect.createNewCronJob(input);
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
          title="New cron job"
          as="h2"
          navigationAction={
            <Link startIcon={<ArrowLeft />} to={`${pluginBasePath}/cron`}>
              Go back
            </Link>
          }
        />
      </Box>
      <ContentLayout>
        <CronJobForm handleSubmit={handleFormSubmit} />
      </ContentLayout>
    </div>
  );
};

export default NewCronJobPage;
