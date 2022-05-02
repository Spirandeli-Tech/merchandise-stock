import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import './helpers/Firebase';
import AppLocale from './lang';
import { NotificationContainer } from './components/common/react-notifications';
import { adminRoot, UserRole } from './constants/defaultValues';
import { getCurrentUser, getDirection } from './helpers/Utils';
import { ProtectedRoute } from './helpers/authHelper';

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/unauthorized')
);
const MyProfile = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/app/my-profile')
);
const Agents = React.lazy(() =>
  import(/* webpackChunkName: "create" */ './views/app/create')
);

const App = ({ locale }) => {
  const direction = getDirection();
  const currentAppLocale = AppLocale[locale];
  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction]);
  return (
    <div className="h-100">
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <>
          <NotificationContainer />
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <ProtectedRoute
                  path={adminRoot}
                  component={ViewApp}
                  roles={[UserRole.admin, UserRole.business]}
                />
                <Route
                  path="/user"
                  render={(props) => <ViewUser {...props} />}
                />
                <Route
                  path="/error"
                  exact
                  render={(props) => <ViewError {...props} />}
                />
                <Route
                  path="/unauthorized"
                  exact
                  render={(props) => <ViewUnauthorized {...props} />}
                />
                {/* <Route
                  path="/"
                  exact
                  render={(props) => <ViewHome {...props} />}
                /> */}
                <Route
                  path="/my-profile"
                  exact
                  render={(props) => <MyProfile {...props} />}
                />
                <Route
                  path="agents/create-agents"
                  exact
                  render={(props) => <Agents {...props} />}
                />
                <Redirect exact from="/" to={adminRoot} />
                <Redirect to="/error" />
              </Switch>
            </Router>
          </Suspense>
        </>
      </IntlProvider>
    </div>
  );
};

const mapStateToProps = ({settings }) => {
  const { locale } = settings;
  const currentUser = getCurrentUser()

  return { currentUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
