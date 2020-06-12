import React, { ReactNode } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { StyledContent } from './Content.styles';

import LandingPage from '../../pages/LandingPage';
import ProductPage from '../../pages/ProductPage';
import AuthPage from '../../pages/AuthPage/AuthPage';

const user = { loggedIn: true };

const ContentContainer: React.FC = () => {
  return (
    <StyledContent>
      {user.loggedIn ? (
        <Switch>
          <Redirect from='/' exact to='/landing' />
          <Route exact path='/products' component={ProductPage} />
          <PrivateRoute path='/landing' component={LandingPage} />
        </Switch>
      ) : (
        <AuthPage />
      )}
    </StyledContent>
  );
};

export default ContentContainer;

/*
 * a wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 */
interface PrivateRouteProps extends RouteProps {
  children?: ReactNode;
  component: any;
}

const PrivateRoute: any = (props: PrivateRouteProps) => {
  const { children, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps): any =>
        user.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
