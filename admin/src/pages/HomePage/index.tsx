/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Button,
} from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { LoadingIndicatorPage } from '@strapi/helper-plugin';
import { CollectSources } from '../../components/CollectSourcesList';
import { collect } from '../../api/collect';
import { Source } from '../../../../types';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sources, setSources] = useState<Source[]>([]);

  const history = useHistory();

  useEffect(() => {
    fetchSources();
  }, []);

  async function fetchSources() {
    const { data } = await collect.getAllSources();
    setSources(data);
    setIsLoading(false);
  }

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <div>
      <BaseHeaderLayout
        title="Collect Sources"
        as="h2"
        primaryAction={
          <Button
            startIcon={<Plus />}
            onClick={() =>
              history.push(
                `/content-manager/collectionType/plugin::collect.collect-source`
              )
            }
          >
            Add a source
          </Button>
        }
      />
      <ContentLayout>
        {sources.length === 0 ? (
          <EmptyStateLayout content="You don't have any collect source yet..." />
        ) : (
          <CollectSources sources={sources} fetchSources={fetchSources} />
        )}
      </ContentLayout>
    </div>
  );
};

export default HomePage;
