import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';

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

const RegisterForm: React.FC<RegisterFormProps> = ({ switchAuthType }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validForm, setValidForm] = useState<boolean>(true);

  const { name, email } = formData;

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
      name='registerForm'
      initialValues={{ name: name.value, email: email.value }}
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
