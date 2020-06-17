import React, { useState } from 'react';
import RegisterForm from '../../components/forms/RegisterForm';
import LoginForm from '../../components/forms/LoginForm';
import { Card } from 'antd';
import { capitalize } from '../../utils';
import { useDispatch } from 'react-redux';
import storeActions from '../../store/store.actions';

enum AuthType {
  LOGIN = 'login',
  REGISTER = 'register',
}

const { clearAuthErrors } = storeActions.auth.Actions;

const AuthPage: React.FC = () => {
  const [authType, setAuthType] = useState(AuthType.LOGIN);
  const dispatch = useDispatch();

  const switchAuthType = (): void => {
    dispatch(clearAuthErrors());
    setAuthType(authType === AuthType.LOGIN ? AuthType.REGISTER : AuthType.LOGIN);
  };

  return (
    <Card title={capitalize(authType)}>
      {authType === AuthType.LOGIN ? <LoginForm switchAuthType={switchAuthType} /> : <RegisterForm switchAuthType={switchAuthType} />}
    </Card>
  );
};

export default AuthPage;
