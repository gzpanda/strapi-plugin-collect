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
  ToggleCheckbox,
  Flex,
  Button,
  TextButton,
} from '@strapi/design-system';
import { Plus, CarretDown } from '@strapi/icons';
import { collect } from '../../api/collect';
import { pluginBasePath } from '../../utils/plugin';
import { Source } from '../../../../types';

type Props = {
  sources: Source[];
  fetchSources(): Promise<void>;
};

export const CollectSources = ({ sources, fetchSources }: Props) => {
  const ROW_COUNT = 1;
  const COL_COUNT = 1;

  const history = useHistory();

  async function handleCreateClass(source: Source) {
    await collect.createClass(source.id);
    fetchSources();
  }

  async function handleAllBtnClick(source: Source) {
    await collect.createVideoAll(source.id);
  }

  async function handleWeekendBtnClick(source: Source) {
    await collect.createVideoWeekend(source.id);
  }

  async function handle24HourBtnClick(source: Source) {
    await collect.createVideo24Hour(source.id);
  }

  return (
    <Box marginBottom={8}>
      <Table
        rowCount={ROW_COUNT}
        colCount={COL_COUNT}
        footer={
          <TFooter
            onClick={() =>
              history.push(
                `/content-manager/collectionType/plugin::collect.collect-source`
              )
            }
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
              <Typography variant="sigma">Kind</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">URL</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Content</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Class</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {sources.map((source) => (
            <Tr key={source.id}>
              <Td>
                <Typography textColor="neutral800">{source.id}</Typography>
              </Td>
              <Td>
                <TextButton
                  onClick={() => {
                    history.push(
                      `/content-manager/collectionType/plugin::collect.collect-source/${source.id}`
                    );
                  }}
                >
                  <Typography textColor="primary700">{source.name}</Typography>
                </TextButton>
              </Td>
              <Td>
                <Typography textColor="primary700">{source.kind}</Typography>
              </Td>
              <Td>
                <Typography textColor="primary700">{source.url}</Typography>
              </Td>
              <Td>
                <Typography textColor="primary700">{source.content}</Typography>
              </Td>
              <Td>
                <Typography textColor="primary700">
                  <ToggleCheckbox
                    disabled={source.class}
                    onLabel="True"
                    offLabel="False"
                    checked={source.class}
                    onChange={() => handleCreateClass(source)}
                    size="S"
                  >
                    The field is required?
                  </ToggleCheckbox>
                </Typography>
              </Td>
              <Td>
                <Flex justifyContent="justify-evenly">
                  <Flex paddingLeft="5px" paddingRight="5px">
                    <Button
                      variant="secondary"
                      onClick={() => handleAllBtnClick(source)}
                    >
                      All
                    </Button>
                  </Flex>
                  <Flex paddingLeft="5px" paddingRight="5px">
                    <Button
                      variant="secondary"
                      onClick={() => handleWeekendBtnClick(source)}
                    >
                      Weekend
                    </Button>
                  </Flex>
                  <Flex paddingLeft="5px" paddingRight="5px">
                    <Button
                      variant="secondary"
                      onClick={() => handle24HourBtnClick(source)}
                    >
                      24H
                    </Button>
                  </Flex>
                  <Flex paddingLeft="5px" paddingRight="5px">
                    <Button
                      variant="secondary"
                      onClick={() => history.push(`${pluginBasePath}/cron`)}
                    >
                      CRON
                    </Button>
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
