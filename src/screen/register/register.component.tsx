import { FC, useEffect, useState } from "react";
import { Form, Input, Button, Row, Alert, Tabs } from "antd";
import { UserOutlined, LockOutlined, HomeOutlined } from "@ant-design/icons";
import "./register.css";
import {
  authService,
  LoginRequestDto,
  LoginResponse,
  LoginStatus,
  UserRole,
} from "../../service/auth.service";
import { Link, Redirect, useHistory } from "react-router-dom";
import { ManagerSignUpDTO, UserSignUpDTO } from "../../dto/dto";
const { TabPane } = Tabs;

export const RegisterComponent: FC = () => {
  const h = useHistory();

  const [alertError, setAlertError] = useState({
    show: false,
    message: "Error",
  });

  const onManagerFinish = async (values: ManagerSignUpDTO) => {
    console.log(values);
    authService
      .registerManager(values)
      .then((res) => {
        console.log(res);
        h.push("/login");
      })
      .catch((e) => {
        console.log(e);
        setAlertError({
          show: true,
          message: "Errore Registration new Manager",
        });
      });
  };

  const onUserFinish = async (values: UserSignUpDTO) => {
    authService
      .registerUser(values)
      .then((res) => {
        console.log(res);
        h.push("/login");
      })
      .catch((e) => {
        console.log(e);
        setAlertError({ show: true, message: "Error Registration New User" });
      });
  };

  return (
    <div className="login-form">
      <a href="/">
        <h2>MyTicket</h2>
      </a>
      <h1>Registration</h1>
      {alertError.show && (
        <Alert
          message="Ops"
          description={alertError.message}
          type="error"
          style={{ marginBottom: 16 }}
        />
      )}
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="User" key="1">
          <Form
            name="login-form"
            labelCol={{ span: 8 }}
            onFinish={onUserFinish}
            labelAlign="left"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Email"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/login">Login now!</Link>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Manager" key="2">
          <Form
            name="login-form"
            labelCol={{ span: 8 }}
            onFinish={onManagerFinish}
            labelAlign="left"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Email"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              name="businessName"
              rules={[
                { required: true, message: "Please input the business Name!" },
              ]}
            >
              <Input
                placeholder="Business Name"
                prefix={<HomeOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <Form.Item>
            <Link to="/login">Login now!</Link>
          </Form.Item>
        </TabPane>
      </Tabs>
      <p>MyTicket @ Matteo Cavallo</p>
    </div>
  );
};
