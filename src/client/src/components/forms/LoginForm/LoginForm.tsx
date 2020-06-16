import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import AuthService from '../../../services/auth.service';

import { useDispatch, useSelector } from 'react-redux';
import storeActions from '../../../store/store.actions';
import { LoginData } from '../../../interfaces/login-data.interface';
import { AuthState } from '../../../interfaces/state/auth-state.interface';
import { AppState } from '../../../interfaces/state/app-state.interface';
import { ObjectState } from '../../../interfaces/state/state.interface';
import { ErrorSource } from '../../../interfaces/error.interface';

interface FormData {
  email: { value: string; status: boolean };
  password: { value: string; status: boolean };
}

interface LoginFormProps {
  switchAuthType(): void;
}

const initialFormData: FormData = {
  email: { value: '', status: false },
  password: { value: '', status: false },
};

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const formTailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { loginUser, loginUserFailed, loginUserSuccess } = storeActions.auth.Actions;

const LoginForm: React.FC<LoginFormProps> = ({ switchAuthType }) => {
  const authState: ObjectState<AuthState> = useSelector((state: AppState) => state.auth);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validForm, setValidForm] = useState<boolean>(true);
  const dispatch = useDispatch();
  const authService = new AuthService();

  const onFinish = async () => {
    dispatch(loginUser());
    try {
      const loginData: LoginData = { email: formData.email.value, password: formData.password.value };
      const res = await authService.login(loginData);

      if (res._id) {
        dispatch(loginUserSuccess(res));
      } else {
        dispatch(loginUserFailed(res));
      }
    } catch (err) {
      dispatch(loginUserFailed(err));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const fieldValidation = (fields: any[], data: any) => {
    //TODO: Check validation of form -> fields valid/invalid are edgy

    if (fields.length > 0 && fields[0].name.length > 0) {
      setFormData({
        ...formData,
        [fields[0]?.name[0]]: { value: fields[0].value, status: !fields[0].errors.length },
      });
    }
    // setValidForm(Object.values(formData).filter((f: any) => !f.status).length === 0);
    setValidForm(true);
  };

  return (
    <Form
      {...formLayout}
      name='loginForm'
      validateTrigger=''
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onFieldsChange={(changedField, allFields) => {
        fieldValidation(changedField, allFields);
      }}
    >
      <Form.Item
        name='email'
        label='E-mail'
        initialValue={null}
        rules={[
          { type: 'email', message: 'The input is no valid e-mail!' },
          { required: true, message: 'Please input your e-mail!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item {...formTailLayout}>
        {authState.error?.source === ErrorSource.LOGIN && <Alert message='Login failed' description={authState.error.message} type='error' closable showIcon />}
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button type='primary' htmlType='submit' disabled={!validForm}>
          Login
        </Button>
        <Button type='link' htmlType='button' onClick={switchAuthType}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
