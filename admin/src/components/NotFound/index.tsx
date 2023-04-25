import React from 'react';
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
} from '@strapi/design-system';

export const NotFound = () => {
  return (
    <div>
      <BaseHeaderLayout title="Page not found" />
      <ContentLayout>
        <EmptyStateLayout content="Oops! We can't seem to find the page you're looking for..." />
      </ContentLayout>
    </div>
  );
};
