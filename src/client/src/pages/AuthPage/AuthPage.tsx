import React, { useState } from 'react';
import RegisterForm from '../../components/forms/RegisterForm';
import LoginForm from '../../components/forms/LoginForm';
import { Card } from 'antd';
import { capitalize } from '../../utils';

enum AuthType {
  LOGIN = 'login',
  REGISTER = 'register',
}

const AuthPage: React.FC = () => {
  const [authType, setAuthType] = useState(AuthType.LOGIN);

  const switchAuthType = (): void => {
    setAuthType(authType === AuthType.LOGIN ? AuthType.REGISTER : AuthType.LOGIN);
    console.log(authType);
  };

  return (
    <Card title={capitalize(authType)}>
      {authType === AuthType.LOGIN ? <LoginForm switchAuthType={switchAuthType} /> : <RegisterForm switchAuthType={switchAuthType} />}
    </Card>
  );
};

export default AuthPage;
