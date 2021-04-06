import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AppLayout from "../../../layout/AppLayout";
const Chat = React.lazy(() =>
  import(/* webpackChunkName: "application-chat" */ "./chat")
);

const Applications = (props) => (
  <AppLayout>
    <Suspense fallback={<div className='loading' />}>
      <Switch>
        {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/todo`} />
      <Route
        path={`${match.url}/todo`}
        render={(props) => <Todo {...props} />}
      />
      <Route
        path={`${match.url}/survey/:surveyid`}
        render={(props) => <SurveyDetail {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/survey`}
        render={(props) => <Survey {...props} />}
        isExact
      /> */}
        <Route path={`/profile/chat`} render={(props) => <Chat {...props} />} />
        {/* <Redirect to="/error" /> */}
      </Switch>
    </Suspense>
  </AppLayout>
);
export default Applications;
