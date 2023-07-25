import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

const Home = () => {
  const auth = useAuth();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vh",
      window.innerHeight * 0.01 + "px"
    );
  }, []);
  return <Outlet context={auth} />;
};

export default Home;
