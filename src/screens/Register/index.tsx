import { Form, Input, Button, Toast } from "antd-mobile";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { routes } from "../../routes";
import {
  addDocument,
  createUserWithEmailAndPasswordFirebase,
  fetchSignInMethodsForEmailFirebase,
  getColRef,
  getDocRef,
} from "../../firebase/service";
import { getDocs, query, where } from "firebase/firestore";

const initialValues = {
  fullName: "Chnirt Chnirt",
  email: "chnirt@gmail.com",
  username: "chnirt",
  password: "Admin@123",
  confirmPassword: "Admin@123",
  // fullName: "",
  // email: "",
  // username: "",
  // password: "",
  // confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const onFinish = async (values: typeof initialValues) => {
    try {
      // console.log('Success:', values)
      const { fullName, email, username, password } = values;
      const providers = await fetchSignInMethodsForEmailFirebase(email);

      if (providers.length > 0) {
        throw Error("Email already exists!");
      }

      // const q = query(getColRef("users"), where("username", "==", username));
      // const querySnapshot = await getDocs(q);
      // const docs = querySnapshot.docs;
      // const data = docs.map((docSnapshot) => {
      //   return {
      //     id: docSnapshot.id,
      //     ...docSnapshot.data(),
      //   };
      // });
      // const foundUser = data[0];
      // if (foundUser) {
      //   throw Error("Username already exists!");
      // }

      const userCredential = await createUserWithEmailAndPasswordFirebase(
        email,
        password
      );

      if (userCredential) {
        const uid = userCredential.user.uid;
        // const jwkKeys = await getJwkKeys();
        const userDocRef = getDocRef("users", uid);
        const userData = {
          uid,
          fullName: String(fullName).trim(),
          email,
          username: String(username).trim(),
          // avatar: avatarPlaceholder,
          // keywords: generateKeywords(email),
          // jwkKeys,
          // language: Language.EN,
        };
        await addDocument(userDocRef, userData);

        // const followingData = {
        //   type: "owner",
        //   uid,
        //   avatar: avatarPlaceholder,
        //   username,
        // };
        // const followerDocRef = getDocRef("users", uid, "following", uid);
        // await addDocument(followerDocRef, followingData);
      }

      // logAnalyticsEvent(eventNames.register, {
      //   email,
      // });
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
        initialValues={initialValues}
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
          rules={[
            { required: true, message: "Full Name is required" },
            {
              min: 4,
              message: "Full Name should be at least 4 characters",
            },
            {
              max: 20,
              message: "Full Name must have at 20 characters",
            },
          ]}
        >
          <Input placeholder="chnirt" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input type="email" placeholder="chnirt@gmail.com" />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: "Username is required" },
            {
              min: 4,
              message: "Username should be at least 4 characters",
            },
            {
              max: 20,
              message: "Username must have at 20 characters",
            },
          ]}
        >
          <Input placeholder="chnirt" />
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
          <Input type="password" placeholder="******" />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Confirm Password is required",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="******"
          />
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
