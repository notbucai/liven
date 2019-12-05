import Web from './layout/web/index';
import Home from './pages/home';
import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

interface IRoute {
  component: React.FC<any>;
  path: string;
  exact?: boolean;
}
interface ILayout {
  path: string;
  layout: React.FC<any>;
  children: IRoute[];
}
export const routers = [
  {
    path: '/',
    layout: Web,
    children: [
      {
        component: Home,
        path: '',
      },
    ],
  }
];

export const renderRoute = (root: string, routes: IRoute[], Layout: React.FC) => {

  const toRoutes = routes.map(({ path, component: Component, exact = true }) => {
    const c_path = root + path;
    return (
      <Route
        path={c_path}
        key={c_path}
        exact={exact}
        render={
          props => (<Layout {...props}>
            <Component {...props} />
          </Layout>)
        }
      />
    );
  });

  return toRoutes;
};

export const renderRoutes = (routes: ILayout[]) => {
  const Routes = routes.map(({ path, layout, children }) => {
    return renderRoute(path, children, layout);
  });
  return (
    <BrowserRouter>
      <Switch>
        {Routes}
      </Switch>
    </BrowserRouter>
  );
};
