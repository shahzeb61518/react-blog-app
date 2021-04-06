import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayout from '../../../../layout/AppLayout';

const BlogList = React.lazy(() =>
  import(/* webpackChunkName: "blog-list" */ './blog-list')
);

const BlogDetail = React.lazy(() =>
  import(/* webpackChunkName: "blog-detail" */ './blog-detail')
);

const PagesBlog = ({ match }) => (
  <AppLayout>
    <Suspense fallback={<div className="loading" />}>
      <BlogList />
      {/* <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/blog-list`} />
      <Route
        path={`${match.url}/blog-list`}
        render={(props) => <BlogList {...props} />}
      />
      <Route
        path={`${match.url}/blog-detail`}
        render={(props) => <BlogDetail {...props} />}
      />
      <Redirect to="/error" />
    </Switch> */}
    </Suspense>
  </AppLayout>
);
export default PagesBlog;
