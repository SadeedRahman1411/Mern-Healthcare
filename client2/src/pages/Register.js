import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Select, Checkbox, Upload, Typography, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Register.css';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const RegistrationForm = () => {
  const [userType, setUserType] = useState('patient');

  const validateName = (_, value) => {
    if (!value || /^[A-Za-z]+( [A-Za-z]+)*$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Names can only contain Alphabets'));
  };

  const validatePhoneNumber = (_, value) => {
    if (/^0\d{10}$/.test(value) || /^\+880\d{10}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid phone number'));
  };

  const validateEmail = (_, value) => {
    if (value.includes('@') && value.includes('.')) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid email '));
  };

  const onFinish = (values) => {
    console.log('Form Values:', values);
  };

  const onUserTypeChange = (value) => {
    setUserType(value);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ASAP Health Care Service
          </Link>
        </div>
      </nav>

      <div className="registration-container">
        <Form layout="vertical" className="registration-form" onFinish={onFinish}> 
          <Title className="registration-title">Register</Title>

          <Form.Item label="User Type" name="userType" initialValue="patient" rules={[{ required: true }]} validateTrigger="onBlur"> 
            <Select onChange={onUserTypeChange}>
              <Option value="patient">Patient</Option>
              <Option value="doctor">Doctor</Option>
            </Select>
          </Form.Item>

          <Form.Item label="First Name" name="firstName" rules={[{ required: true }, { validator: validateName }]} validateTrigger="onBlur"> 
            <Input placeholder="First Name" />
          </Form.Item>
          
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }, { validator: validateName }]} validateTrigger="onBlur"> 
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item label="Date of Birth" name="dob" rules={[{ required: true }]} validateTrigger="onBlur"> 
            <DatePicker className="full-width" />
          </Form.Item>

          <Form.Item label="Blood Group" name="bloodGroup" rules={[{ required: true }]} validateTrigger="onBlur"> 
            <Radio.Group>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                <Radio value={group} key={group}>{group}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Gender" name="gender" rules={[{ required: true }]} validateTrigger="onBlur"> 
            <Select placeholder="Select Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Contact Number" name="contactNumber" rules={[{ required: true }, { validator: validatePhoneNumber }]} validateTrigger="onBlur"> 
            <Input placeholder="Contact Number" />
          </Form.Item>

          <Form.Item label="Email ID" name="email" rules={[{ required: true }, { validator: validateEmail }]} validateTrigger="onBlur"> 
            <Input placeholder="Email ID" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, min: 6, max: 20 }]} validateTrigger="onBlur"> 
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {userType === 'doctor' && (
            <>
              <Form.Item label="Degrees" name="degrees" rules={[{ required: true }]} validateTrigger="onBlur"> 
                <Input placeholder="e.g., MBBS, MD" />
              </Form.Item>
              <Form.Item label="Expertise" name="expertise" rules={[{ required: true }]} validateTrigger="onBlur"> 
                <TextArea rows={3} placeholder="e.g., Cardiology, Neurology" />
              </Form.Item>
            </>
          )}

          {userType === 'patient' && (
            <>
              <Form.Item label="Insurance Coverages" name="insurance" rules={[{ required: true }]} validateTrigger="onBlur"> 
                <TextArea rows={3} placeholder="e.g., Provider Name, Policy Number" />
              </Form.Item>
              <Form.Item label="Previous Medical Records" name="medicalRecords" valuePropName="fileList" getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}>
                <Upload action="/upload.do" listType="text">
                  <Button icon={<PlusOutlined />}>Upload Records</Button>
                </Upload>
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="full-width">Submit</Button>
          </Form.Item>

          <Form.Item>
            <div className="login-section">
              <span>Already a user? </span>
              <Link to="/login" className="login-link">Login here</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
