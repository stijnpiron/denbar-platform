import React, { ReactNode, useEffect } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { StyledContent } from './Content.styles';

import OverviewPage from '../../pages/OverviewPage/OverviewPage';
import ProductPage from '../../pages/ProductPage';
import AuthPage from '../../pages/AuthPage/AuthPage';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../interfaces/state/app-state.interface';
import { AuthState } from '../../interfaces/state/auth-state.interface';
import storeActions from '../../store/store.actions';
import api from '../../utils/api';

const { checkAuth, checkAuthFailed, checkAuthSuccess } = storeActions.auth.Actions;

const ContentContainer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    dispatch(checkAuth());
    try {
      const res = await api.get('/auth/check');
      if (res.data?._id) {
        dispatch(checkAuthSuccess(res.data));
      }
      dispatch(checkAuthFailed({ code: 401, type: 'Unauthorized', message: 'Wrong or no authentication token provided' }));
    } catch (err) {
      dispatch(checkAuthFailed(err));
    }
  };

  const user: AuthState = useSelector((state: AppState) => state.auth).data || { isAuthenticated: false };

  return (
    <StyledContent>
      {checkAuthentication && user.isAuthenticated ? (
        <Switch>
          <Redirect from='/' exact to='/overview' />
          <PrivateRoute exact path='/products' component={ProductPage} />
          <PrivateRoute exact path='/overview' component={OverviewPage} />
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
  const user: AuthState = useSelector((state: AppState) => state.auth).data || { isAuthenticated: false };

  return (
    <Route
      {...rest}
      render={(routeProps): any =>
        user.isAuthenticated ? (
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
