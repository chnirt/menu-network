import { Avatar, Dialog, Footer, List } from "antd-mobile";
import { useCallback } from "react";
import { LeftOutline } from "antd-mobile-icons";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { logout } = useAuth();
  const handleLogout = useCallback(() => {
    Dialog.confirm({
      content: "Are you sure want to log out?",
      cancelText: "Cancel",
      confirmText: "Log out",
      onConfirm: async () => {
        const logoutFromAPI = async () => {
          const data: boolean = await new Promise((resolve) =>
            setTimeout(() => resolve(true), 1000)
          );
          return data;
        };
        logout(logoutFromAPI);
      }
    });
  }, [logout]);

  return (
    <div>
      <List mode="card">
        <List.Item
          prefix={
            <Avatar
              src={
                "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              }
            />
          }
          description="Deserunt dolor ea eaque eos"
        >
          Anonymous
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
