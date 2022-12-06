import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (value) => {
    navigate("/", { state: value });
  };

  const onReset = () => {
    formRef.current.resetFields();
  };

  let formRef = React.createRef();

  return (
    <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
      <Form.Item
        name="pseudo"
        label="Pseudo"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="code"
        label="Code"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
