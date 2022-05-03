import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';
import { UserRole } from '../../constants/defaultValues';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);

const Users = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './users')
);
const Subscribers = React.lazy(() =>
  import(/* webpackChunkName: "subscribers" */ './subscribers')
);
const Destinations = React.lazy(() =>
  import(/* webpackChunkName: "destinations" */ './destinations')
);
const Companies = React.lazy(() =>
  import(/* webpackChunkName: "companies" */ './companies')
);
const Plans = React.lazy(() =>
  import(/* webpackChunkName: "plans" */ './plans')
);
const Transactions = React.lazy(() =>
  import(/* webpackChunkName: "transactions" */ './transactions')
);
const MyProfile = React.lazy(() =>
  import(/* webpackChunkName: "my-profile" */ './my-profile')
);
const Agents = React.lazy(() =>
  import(/* webpackChunkName: "agents" */ './agents')
);
const Create = React.lazy(() =>
  import(/* webpackChunkName: "create" */ './create')
);
const Employees = React.lazy(() =>
  import(/* webpackChunkName: "employees" */ './employees')
);
const Products = React.lazy(() =>
  import(/* webpackChunkName: "employees" */ './employees')
);

const App = ({ match }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/my-profile`}
              />
              <ProtectedRoute
                path={`${match.url}/users`}
                render={(props) => <Users {...props} />}
                component={Users}
                roles={[UserRole.admin]}
              />
              <Route
                path={`${match.url}/dashboards`}
                render={(props) => <Dashboards {...props} />}
              />
              <Route
                path={`${match.url}/products`}
                render={(props) => <Products {...props} />}
              />
              <Route
                path={`${match.url}/applications`}
                render={(props) => <Applications {...props} />}
              />
              {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
              <Route
                path={`${match.url}/pages`}
                render={(props) => <Pages {...props} />}
              />
              <Route
                path={`${match.url}/ui`}
                render={(props) => <Ui {...props} />}
              />
              <Route
                path={`${match.url}/menu`}
                render={(props) => <Menu {...props} />}
              />
              <Route
                path={`${match.url}/blank-page`}
                render={(props) => <BlankPage {...props} />}
              />
              <ProtectedRoute
                path={`${match.url}/subscribers`}
                component={Subscribers}
                roles={[UserRole.admin]}
              />
              <ProtectedRoute
                path={`${match.url}/destinations`}
                component={Destinations}
                roles={[UserRole.admin]}
              />
              <ProtectedRoute
                path={`${match.url}/companies`}
                component={Companies}
                roles={[UserRole.admin, UserRole.business]}
              />
              <ProtectedRoute
                path={`${match.url}/plans`}
                component={Plans}
                roles={[UserRole.admin]}
              />
              <ProtectedRoute
                path={`${match.url}/transactions`}
                component={Transactions}
                roles={[UserRole.admin]}
              />
              <Route
                path={`${match.url}/my-profile`}
                render={(props) => <MyProfile {...props} />}
              />
              <ProtectedRoute
                path={`${match.url}/agents`}
                component={Agents}
                roles={[UserRole.admin]}
              />
              <ProtectedRoute
                path={`${match.url}/create-agents`}
                component={Create}
                roles={[UserRole.admin]}
              />
              <ProtectedRoute
                path={`${match.url}/employees`}
                component={Employees}
                roles={[UserRole.admin]}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    </QueryClientProvider>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
