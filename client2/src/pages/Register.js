import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Select, Checkbox, Upload, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the external CSS file

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const RegistrationForm = () => {
  const [userType, setUserType] = useState('patient');

  const onFinish = (values) => {
    console.log('Form Values:', values);
  };

  const onUserTypeChange = (value) => {
    setUserType(value);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          {/* ASAP Health Care Service */}
          <Link className="navbar-brand" to="/">
            ASAP Health Care Service
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="registration-container">
        <Form
          layout="vertical"
          className="registration-form"
          onFinish={onFinish}
        >
          {/* Heading */}
          <Title className="registration-title">Register</Title>

          {/* User Type Selection */}
          <Form.Item
            label="User Type"
            name="userType"
            initialValue="patient"
            rules={[{ required: true, message: 'Please select a user type!' }]}
          >
            <Select onChange={onUserTypeChange}>
              <Option value="patient">Patient</Option>
              <Option value="doctor">Doctor</Option>
            </Select>
          </Form.Item>

          {/* Common Fields */}
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name!' }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter your last name!' }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker className="full-width" />
          </Form.Item>
          <Form.Item
            label="Blood Group"
            name="bloodGroup"
            rules={[{ required: true, message: 'Please select your blood group!' }]}
          >
            <Checkbox.Group>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                <Checkbox value={group} key={group}>
                  {group}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select placeholder="Select Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              { required: true, message: 'Please enter your contact number!' },
              { pattern: /^[0-9]{11}$/, message: 'Please enter a valid 11-digit phone number!' },
            ]}
          >
            <Input placeholder="Contact Number" />
          </Form.Item>
          <Form.Item
            label="Email ID"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email ID!' },
              { type: 'email', message: 'Please enter a valid email ID!' },
            ]}
          >
            <Input placeholder="Email ID" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password!' },
              { min: 6, message: 'Password must be at least 6 characters long!' },
              { max: 20, message: 'Password cannot exceed 20 characters!' },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Conditional Fields for Doctor */}
          {userType === 'doctor' && (
            <>
              <Form.Item
                label="Degrees"
                name="degrees"
                rules={[{ required: true, message: 'Please enter your degrees!' }]}
              >
                <Input placeholder="e.g., MBBS, MD" />
              </Form.Item>
              <Form.Item
                label="Expertise"
                name="expertise"
                rules={[{ required: true, message: 'Please enter your area of expertise!' }]}
              >
                <TextArea rows={3} placeholder="e.g., Cardiology, Neurology" />
              </Form.Item>
            </>
          )}

          {/* Conditional Fields for Patient */}
          {userType === 'patient' && (
            <>
              <Form.Item
                label="Insurance Coverages"
                name="insurance"
                rules={[{ required: true, message: 'Please provide insurance details!' }]}
              >
                <TextArea rows={3} placeholder="e.g., Provider Name, Policy Number" />
              </Form.Item>
              <Form.Item
                label="Previous Medical Records"
                name="medicalRecords"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload action="/upload.do" listType="text">
                  <Button icon={<PlusOutlined />}>Upload Records</Button>
                </Upload>
              </Form.Item>
            </>
          )}

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="full-width">
              Submit
            </Button>
          </Form.Item>

          {/* Login Section */}
          <Form.Item>
            <div className="login-section">
              <span>Already a user? </span>
              <Link to="/login" className="login-link">
                Login here
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;
