import { Form, Input, Button, Toast } from "antd-mobile";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
import { routes } from "../../routes";
import { signInWithEmailAndPasswordFirebase } from "../../firebase/service";

const Login = () => {
  const navigate = useNavigate();
  // const { login } = useAuth();

  const onFinish = async (values: any) => {
    try {
      const { email, password } = values;
      await signInWithEmailAndPasswordFirebase(email, password);
      // logAnalyticsEvent(eventNames.login, { email })
    } catch (error: any) {
      // console.log(error.message)
      Toast.show({
        icon: "error",
        content: error.message,
      });
    } finally {
    }
    // if (values.username === "chnirt" && values.password === "Admin@123") {
    //   const loginFromAPI = async () => {
    //     const data: { username: string } = await new Promise((resolve) =>
    //       setTimeout(() => resolve({ username: values.username }), 1000)
    //     );
    //     return data;
    //   };
    //   return login(loginFromAPI);
    // }
  };

  return (
    <Fragment>
      <Form
        initialValues={{
          email: "chnirt@gmail.com",
          password: "Admin@123",
        }}
        layout="horizontal"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            Login
          </Button>
        }
      >
        <Form.Header>Login</Form.Header>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input type="email" autoComplete="email" placeholder="chnirt" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Password is required" },
            {
              min: 4,
              message: "Password should be at least 4 characters",
            },
            {
              max: 20,
              message: "Password must have at 20 characters",
            },
          ]}
        >
          <Input
            type="password"
            autoComplete="current-password"
            placeholder="******"
          />
        </Form.Item>
      </Form>
      <Button
        color="primary"
        fill="none"
        onClick={() => navigate(routes.register)}
      >
        CREATE ACCOUNT
      </Button>
    </Fragment>
  );
};

export default Login;
