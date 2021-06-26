import { FC, useEffect, useState } from "react";
import { Form, Input, Button, Row, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import {
  authService,
  LoginRequestDto,
  LoginResponse,
  LoginStatus,
  UserRole,
} from "../../service/auth.service";
import { Link, Redirect, useHistory } from "react-router-dom";

export const Login: FC = () => {
  const h = useHistory();

  const [alertError, setAlertError] = useState({
    show: false,
    message: "Error",
  });

  const onSubmitButton = async (values: LoginRequestDto) => {
    try {
      // Call to Auth Service
      const response = await authService.login(values);

      // Handle Redirect based on User Role
      switch (response.authorities[0]) {
        case "MANAGER":
        case "ADMIN":
          h.push("/manager");
          break;
        case "USER":
          h.push("/");
          break;
      }
    } catch (e) {
      setAlertError({
        show: true,
        message: "Ehm. Something is wrong. Try Again.",
      });
    }
  };

  return (
    <div className="login-form">
      <a href="/">
        <h2>MyTicket</h2>
      </a>
      <h1>Please sign in</h1>
      {alertError.show && (
        <Alert
          message="Ops"
          description={alertError.message}
          type="error"
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        name="login-form"
        labelCol={{ span: 8 }}
        onFinish={onSubmitButton}
        labelAlign="left"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/register">Register now!</Link>
        </Form.Item>
      </Form>
      <p>MyTicket @ Matteo Cavallo</p>
    </div>
  );
};
