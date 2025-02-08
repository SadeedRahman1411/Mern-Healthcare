import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './Login.css';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ASAP Health Care Service
        </Link>
      </div>
    </nav>

    <div className="login-container">
      <h1 className="login-heading">Login</h1>

      <Form
        name="basic"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{
            required: true,
            message: 'Please input your username!',
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{
            required: true,
            message: 'Please input your password!',
          }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          className="login-remember"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item className="login-submit">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div className="register-link">
        Don't have an account?{' '}
        <Link to="/register" className="register-link-text">
          Register
        </Link>
      </div>
    </div>
  </div>
);

export default Login;
