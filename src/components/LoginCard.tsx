import React, { useState } from "react";
import styled from "styled-components";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "../utils/constants";

const StyledErrorMessage = styled.div``;

const LoginCard = (): JSX.Element => {
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const url = `${BACKEND_API_URL}/auth/signin`;
  const onFinish = async (values: any) => {
    const response = await axios.post(url, values);

    sessionStorage.setItem("token", response.data.accessToken);
    if (response.status >= 200 && response.status < 300) {
      setValid(true);
      navigate("/panel");
    } else {
      setValid(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <StyledErrorMessage>
        {!valid && <p>Please try again</p>}
      </StyledErrorMessage>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginCard;
