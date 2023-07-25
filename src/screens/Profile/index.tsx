import { Avatar, Dialog, Footer, List } from "antd-mobile";
import { useCallback } from "react";
import { LeftOutline } from "antd-mobile-icons";
import useAuth from "../../hooks/useAuth";
import { signOutFirebase } from "../../firebase/service";

const Profile = () => {
  const { user, logout } = useAuth();
  const handleLogout = useCallback(() => {
    Dialog.confirm({
      content: "Are you sure want to log out?",
      cancelText: "Cancel",
      confirmText: "Log out",
      onConfirm: async () => {
        signOutFirebase();
        // const logoutFromAPI = async () => {
        //   const data: boolean = await new Promise((resolve) =>
        //     setTimeout(() => resolve(true), 1000)
        //   );
        //   return data;
        // };
        // logout(logoutFromAPI);
      },
    });
  }, [logout]);

  return (
    <div>
      <List mode="card">
        <List.Item
          prefix={<Avatar src={user?.photoURL ?? ""} />}
          description={user?.email}
        >
          {user?.email}
        </List.Item>
        <List.Item prefix={<LeftOutline />} onClick={handleLogout}>
          Log out
        </List.Item>
        <Footer content="@ 2004-2023 https://github.com/chnirt All rights reserved"></Footer>
      </List>
    </div>
  );
};

export default Profile;
