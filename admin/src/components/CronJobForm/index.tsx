//@ts-nocheck
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  TextInput,
  DatePicker,
  GridItem,
  NumberInput,
  Stack,
} from '@strapi/design-system';
import { getCurrentDate } from '../../utils/date';
import { CronJob, CronJobInputData } from '../../../../types';

const initialInput: CronJobInputData = {
  name: '',
  schedule: '',
  command: 'collect vod',
  iterationsLimit: -1,
  startDate: null,
  endDate: null,
};

type Props = {
  initialData?: CronJob;
  handleSubmit({ input, setErrors }): Promise<void>;
};

export const CronJobForm = ({ initialData, handleSubmit }: Props) => {
  const state = initialData ? initialData : initialInput;
  const [input, setInput] = useState<CronJobInputData>(state);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: null });
  }

  function handleDateChange(inputName: string, value: Date | null) {
    if (inputName === 'startDate') {
      value?.setHours(0, 0, 0, 0);
    }
    if (inputName === 'endDate') {
      value?.setHours(23, 59, 59, 999);
    }
    handleInputChange({
      target: { name: inputName, value },
    });
  }

  function formSubmit(e) {
    e.preventDefault();
    handleSubmit({
      input,
      setErrors,
    });
  }

  return (
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
      <form onSubmit={formSubmit}>
        <Grid gap={7} gridCols={1}>
          <Box>
            <TextInput
              placeholder="cron job name"
              required
              label="Name"
              name="name"
              aria-label="cron job name input"
              value={input.name}
              onChange={handleInputChange}
              error={errors['name']}
            />
          </Box>
          <Box>
            <TextInput
              placeholder="cron job schdule expression"
              required
              label="Schedule"
              name="schedule"
              aria-label="cron job schedule expression input"
              value={input.schedule}
              onChange={handleInputChange}
              error={errors['schedule']}
            />
          </Box>
          <Grid gap={7} gridCols={2}>
            <GridItem col={1} s={2} xs={2}>
              <Box>
                <DatePicker
                  placeholder={getCurrentDate()}
                  label="Start date"
                  name="startDate"
                  hint="Publish on this date"
                  selectedDateLabel={(formattedDate) =>
                    `cron job start date is ${formattedDate}`
                  }
                  selectedDate={
                    input.startDate ? new Date(input.startDate) : null
                  }
                  onChange={(value) => handleDateChange('startDate', value)}
                  onClear={(value) => handleDateChange('startDate', null)}
                  error={errors['startDate']}
                />
              </Box>
            </GridItem>
            <GridItem col={1} s={2} xs={2}>
              <Box>
                <DatePicker
                  placeholder={getCurrentDate()}
                  label="End date"
                  name="endDate"
                  hint="Unpublish on this date"
                  selectedDateLabel={(formattedDate) =>
                    `cron job end date is ${formattedDate}`
                  }
                  selectedDate={input.endDate ? new Date(input.endDate) : null}
                  onChange={(value) => handleDateChange('endDate', value)}
                  onClear={(value) => handleDateChange('endDate', null)}
                  error={errors['endDate']}
                />
              </Box>
            </GridItem>
          </Grid>
          <Box>
            <NumberInput
              placeholder="Number of iterationsLimit"
              label="Iterations"
              name="iterationsLimit"
              hint="Default: unlimited"
              aria-label="Number of iterations"
              value={input.iterationsLimit}
              onValueChange={(value) =>
                handleInputChange({
                  target: { name: 'iterationsLimit', value },
                })
              }
              error={errors['iterationsLimit']}
            />
          </Box>
          <Box>
            <TextInput
              placeholder="command"
              required
              label="Command"
              name="command"
              aria-label="cron job command input"
              value={input.command}
              onChange={handleInputChange}
              error={errors['command']}
            />
          </Box>
          <Stack horizontal spacing={4}>
            <Button size="L" type="submit">
              Save
            </Button>
            <Button
              size="L"
              variant="tertiary"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </form>
    </Box>
  );
};
