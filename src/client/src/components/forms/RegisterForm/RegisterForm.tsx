import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import AuthService from '../../../services/rest/auth.rest.service';
import { RegisterData } from '../../../interfaces/register-data.interface';
import { useDispatch, useSelector } from 'react-redux';
import storeActions from '../../../store/store.actions';
import { ObjectState } from '../../../interfaces/state/state.interface';
import { AuthState } from '../../../interfaces/state/auth-state.interface';
import { AppState } from '../../../interfaces/state/app-state.interface';
import { ErrorSource } from '../../../interfaces/error.interface';
interface FormData {
  name: { value: string; status: boolean };
  email: { value: string; status: boolean };
  password: { value: string; status: boolean };
  passwordCheck: { value: string; status: boolean };
}

interface RegisterFormProps {
  switchAuthType(): void;
}

const initialFormData: FormData = {
  name: { value: '', status: false },
  email: { value: '', status: false },
  password: { value: '', status: false },
  passwordCheck: { value: '', status: false },
};

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const formTailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { registerUser, registerUserFailed, registerUserSuccess } = storeActions.auth.Actions;

const RegisterForm: React.FC<RegisterFormProps> = ({ switchAuthType }) => {
  const authState: ObjectState<AuthState> = useSelector((state: AppState) => state.auth);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validForm, setValidForm] = useState<boolean>(true);
  const dispatch = useDispatch();
  const authService = new AuthService();

  const onFinish = async () => {
    dispatch(registerUser());
    try {
      const registerData: RegisterData = { name: formData.name.value, email: formData.email.value, password: formData.password.value };
      const res = await authService.register(registerData);

      if (res._id) {
        dispatch(registerUserSuccess(res));
      } else {
        dispatch(registerUserFailed(res));
      }
    } catch (err) {
      dispatch(registerUserFailed(err));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.warn('Failed:', errorInfo);
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
      name='registerForm'
      validateTrigger=''
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onFieldsChange={(changedField, allFields) => {
        fieldValidation(changedField, allFields);
      }}
    >
      <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input />
      </Form.Item>

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

      <Form.Item
        label='Repeat password'
        dependencies={['password']}
        name='passwordCheck'
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...formTailLayout}>
        {authState.error?.source === ErrorSource.REGISTER && (
          <Alert message='Registration failed' description={authState.error.message} type='error' closable showIcon />
        )}
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button type='primary' htmlType='submit' disabled={!validForm}>
          Register
        </Button>{' '}
        <Button type='link' htmlType='button' onClick={switchAuthType}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
