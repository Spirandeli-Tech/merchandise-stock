import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppLayout from 'layout/AppLayout';

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
const Units = React.lazy(() =>
  import(/* webpackChunkName: "units" */ './units')
);
const Products = React.lazy(() =>
  import(/* webpackChunkName: "products" */ './products')
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
                to={`${match.url}/products`}
              />
              <Route
                path={`${match.url}/units`}
                render={(props) => <Units {...props} />}
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
