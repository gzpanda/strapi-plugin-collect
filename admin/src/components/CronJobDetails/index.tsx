//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  GridItem,
  Box,
  Typography,
  Divider,
  BaseHeaderLayout,
  ContentLayout,
  Box,
  Link,
} from '@strapi/design-system';
import { ArrowLeft } from '@strapi/icons';
import { CodeBlock, xt256 } from '@discostudioteam/react-code-blocks';
import { NotFound } from '../NotFound';
import { collect } from '../../api/collect';
import { getReadableDate } from '../../utils/date';
import { pluginBasePath } from '../../utils/plugin';
import { CronJob } from '../../../../types';

type Props = {
  match: {
    params: { id: number };
  };
};

export const CronJobDetails = ({ match }: Props) => {
  const location = useLocation();
  const [cronJob, setCronJob] = useState<CronJob>(location.state?.cronJob);

  useEffect(() => {
    fetchCronJob();
  }, []);

  if (!cronJob) {
    return <NotFound />;
  }

  async function fetchCronJob() {
    const { data } = await collect.getCronJob(cronJob.id);
    setCronJob(data);
  }

  // const executionLog =
  //   cronJob.latestExecutionLog?.map((line) => line.join(' ')).join('\n') ?? '';

  const executionLog = cronJob.latestExecutionLog
    ? cronJob.latestExecutionLog
    : '';

  const PropRow = ({ name, value }) => (
    <div>
      <GridItem col={2}>
        <Box>
          <Typography variant="epsilon">{name}</Typography>
        </Box>
      </GridItem>
      <GridItem col={4}>
        <Box>
          <Typography variant="epsilon">{value}</Typography>
        </Box>
      </GridItem>
      <GridItem col={6} paddingTop={3} paddingBottom={3}>
        <Divider />
      </GridItem>
    </div>
  );

  const iterations =
    cronJob.iterationsLimit === -1
      ? '∞'
      : `${cronJob.iterationsCount} / ${cronJob.iterationsLimit}`;

  return (
    <div>
      <Box background="neutral100">
        <BaseHeaderLayout
          title={cronJob?.name ?? ''}
          as="h2"
          navigationAction={
            <Link startIcon={<ArrowLeft />} to={`${pluginBasePath}/cron`}>
              Go back
            </Link>
          }
        />
      </Box>
      <ContentLayout>
        <Box
          padding={8}
          marginBottom={8}
          borderStyle={'solid'}
          borderWidth={'1px'}
          borderColor={'neutral150'}
          borderRadius={'4px'}
          shadow="tableShadow"
          background="neutral0"
        >
          <Box>
            <Grid gap={1} gridCols={6}>
              <PropRow
                name="Published at"
                value={getReadableDate(cronJob.publishedAt) || '—'}
              />
              <PropRow name="Schedule" value={cronJob.schedule} />

              <PropRow
                name="Start date"
                value={getReadableDate(cronJob.startDate) || '—'}
              />
              <PropRow
                name="End date"
                value={getReadableDate(cronJob.endDate) || '—'}
              />
              <PropRow name="Iterations" value={iterations} />
              <GridItem col={6}>
                <Box paddingTop={6} paddingBottom={2}>
                  <Typography variant="epsilon">
                    Latest execution log
                  </Typography>
                </Box>
                <CodeBlock text={executionLog} theme={xt256} language="text" />
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </ContentLayout>
    </div>
  );
};
