import { Form, Input, Button } from "antd-mobile";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { routes } from "../../routes";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const onFinish = async (values: any) => {
    if (values.username === "chnirt" && values.password === "Admin@123") {
      const loginFromAPI = async () => {
        const data: { username: string } = await new Promise((resolve) =>
          setTimeout(() => resolve({ username: values.username }), 1000)
        );
        return data;
      };
      return login(loginFromAPI);
    }
  };
  return (
    <Fragment>
      <Form
        initialValues={{
          fullName: "chnirt",
          email: "chnirt@gmail.com",
          username: "chnirt",
          password: "Admin@123"
        }}
        layout="horizontal"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            Register
          </Button>
        }
      >
        <Form.Header>Register</Form.Header>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input placeholder="chnirt" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input type="email" placeholder="chnirt@gmail.com" />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input placeholder="chnirt" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input type="password" placeholder="******" />
        </Form.Item>
      </Form>
      <Button
        color="primary"
        fill="none"
        onClick={() => navigate(routes.login)}
      >
        LOGIN
      </Button>
    </Fragment>
  );
};

export default Register;
