import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CompassOutline,
  ShopbagOutline,
  UnorderedListOutline,
  UserOutline
} from "antd-mobile-icons";
import { routes } from "../../routes";
import { TabBar } from "antd-mobile";

const BottomTabBar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  const tabs = [
    {
      key: routes.dashboard,
      // title: "Dashboard",
      icon: <CompassOutline />
    },
    {
      key: routes.menu.replace(":menuId", "123"),
      // title: "Menu",
      icon: <UnorderedListOutline />
    },
    {
      key: routes.order,
      // title: "Order",
      icon: <ShopbagOutline />
    },
    {
      key: routes.me,
      // title: "Profile",
      icon: <UserOutline />
    }
  ];

  return (
    <TabBar
      className="bg-white"
      activeKey={pathname}
      onChange={(value) => {
        setRouteActive(value);
      }}
    >
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default BottomTabBar;
