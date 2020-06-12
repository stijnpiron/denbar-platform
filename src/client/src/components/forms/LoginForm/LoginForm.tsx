import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

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

const LoginForm: React.FC<LoginFormProps> = ({ switchAuthType }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validForm, setValidForm] = useState<boolean>(true);

  const { email } = formData;

  const onFinish = () => {};

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const fieldValidation = (fields: any[], data: any) => {
    //TODO: Check validation of form -> fields valid/invalid are edgy
    console.log(data);

    if (fields.length > 0 && fields[0].name.length > 0) {
      setFormData({
        ...formData,
        [fields[0]?.name[0]]: { value: fields[0].value, status: !fields[0].errors.length },
      });
      console.log(formData);
    }
    // setValidForm(Object.values(formData).filter((f: any) => !f.status).length === 0);
    setValidForm(true);
    // console.log(formData);
  };

  return (
    <Form
      {...formLayout}
      name='loginForm'
      initialValues={{ email: email.value }}
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
