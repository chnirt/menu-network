import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { WaterMark } from "antd-mobile";
import LoadingMask from "../../components/LoadingMask";
import { Loading } from "../../global";

const Home = () => {
  const auth = useAuth();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vh",
      window.innerHeight * 0.01 + "px"
    );
  }, []);
  return (
    <Fragment>
      <Outlet context={auth} />
      <WaterMark
        {...{
          content: "Chnirt",
        }}
      />
      <LoadingMask ref={Loading.set} />
    </Fragment>
  );
};

export default Home;
