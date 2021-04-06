import React, { Suspense, useEffect } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';

import AppLayout from '../../layout/AppLayout';

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages/product')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);

const App = ({ match, history }) => {
  useEffect(() => {
    check();
  });

  const check = async () => {
    let user = await reactLocalStorage.get('user');

    // if (!user) {
    //   console.log('uusserr :: ');
    //   return history.push('/user');
    // }
  };
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Route exact path={`/`} render={(props) => <Gogo {...props} />} />
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

export default App;
