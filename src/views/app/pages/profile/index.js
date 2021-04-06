import React, { Suspense, useEffect } from "react";
import axios from "axios";
import AppLayout from "../../../../layout/AppLayout";

const Portfolio = React.lazy(() =>
  import(/* webpackChunkName: "profile-portfolio" */ "./portfolio")
);
const Social = React.lazy(() =>
  import(/* webpackChunkName: "profile-social" */ "./social")
);

const PagesProfile = ({ match }) => {
  useEffect(() => {
    // console.log('This is maaatttcchhhhhh :: ', match);
  });
  return (
    <AppLayout>
      <Suspense fallback={<div className='loading' />}>
        <Portfolio />
        {/* <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/portfolio`} />
        <Route
          path={`${match.url}/portfolio`}
          render={(props) => <Portfolio {...props} />}
        />
        <Route
          path={`${match.url}/social`}
          render={(props) => <Social {...props} />}
        />
        <Redirect to="/error" />
      </Switch> */}
      </Suspense>
    </AppLayout>
  );
};
export default PagesProfile;
