//@ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Table,
  Tbody,
  Td,
  TFooter,
  Th,
  Thead,
  Tr,
  IconButton,
  Typography,
  VisuallyHidden,
  Flex,
  TextButton,
  Badge,
  Tooltip,
  Switch,
} from '@strapi/design-system';
import { Plus, CarretDown, Pencil, Trash } from '@strapi/icons';
import { pluginBasePath } from '../../utils/plugin';
import { getReadableDate } from '../../utils/date';
import { collect } from '../../api/collect';
import { CronJob } from '../../../../types';
type Props = {
  cronJobs: CronJob[];
  fetchCronJobs(): Promise<void>;
};

export const CronJobsList = ({ cronJobs, fetchCronJobs }: Props) => {
  const ROW_COUNT = 1;
  const COL_COUNT = 1;

  const history = useHistory();

  async function handleSwitchChange(cronJob: CronJob) {
    const isPublished = !!cronJob.publishedAt;
    const message = isPublished
      ? 'This action will unpublish the cron job and reset its iterations count'
      : 'This action will publish the cron job';
    const confirmation = confirm(message);
    if (!confirmation) {
      return;
    }
    await (isPublished
      ? collect.unpublishCronJob(cronJob.id)
      : collect.publishCronJob(cronJob.id));
    fetchCronJobs();
  }

  async function handleDeleteBtnClick(cronJob) {
    const confirmation = confirm('This action will delete: ' + cronJob.name);
    if (!confirmation) {
      return;
    }
    await collect.deleteCronJob(cronJob.id);
    fetchCronJobs();
  }

  return (
    <Box marginBottom={8}>
      <Table
        rowCount={ROW_COUNT}
        colCount={COL_COUNT}
        footer={
          <TFooter
            onClick={() => {
              history.push(`${pluginBasePath}/cron-jobs/create`);
            }}
            icon={<Plus />}
          >
            Add new cron job
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th
              action={
                <IconButton label="Sort on ID" icon={<CarretDown />} noBorder />
              }
            >
              <Typography variant="sigma">ID</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Name</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Schedule</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Command</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Iterations</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Start Date</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">End Date</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {cronJobs.map((cronJob) => (
            <Tr key={cronJob.id}>
              <Td>
                <Typography textColor="neutral800">{cronJob.id}</Typography>
              </Td>
              <Td>
                <TextButton
                  onClick={() => {
                    history.push(`${pluginBasePath}/cron-jobs/${cronJob.id}`, {
                      cronJob,
                    });
                  }}
                >
                  <Typography textColor="primary700">{cronJob.name}</Typography>
                </TextButton>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {cronJob.schedule}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {cronJob.command}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {cronJob.iterationsLimit === -1
                    ? '∞'
                    : cronJob.iterationsLimit}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {getReadableDate(cronJob.startDate) || '—'}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {getReadableDate(cronJob.endDate) || '—'}
                </Typography>
              </Td>
              <Td>
                <Flex justifyContent="justify-between">
                  <div style={{ width: '70px' }}>
                    <Flex justifyContent="center" grow="1">
                      {!cronJob.publishedAt ? (
                        <Badge>Draft</Badge>
                      ) : (
                        <Tooltip
                          description={getReadableDate(cronJob.publishedAt)}
                          position="bottom"
                        >
                          <Badge active>Published</Badge>
                        </Tooltip>
                      )}
                    </Flex>
                  </div>
                  <Flex justifyContent="justify-evenly">
                    <Flex paddingLeft="10px" paddingRight="10px">
                      <IconButton
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                        onClick={() => {
                          history.push(
                            `${pluginBasePath}/cron-jobs/edit/${cronJob.id}`,
                            {
                              cronJob,
                            }
                          );
                        }}
                      />
                      <IconButton
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                        onClick={() => handleDeleteBtnClick(cronJob)}
                      />
                    </Flex>
                    <Switch
                      label="Toggle cron job"
                      selected={!!cronJob.publishedAt}
                      onChange={() => handleSwitchChange(cronJob)}
                    />
                  </Flex>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
