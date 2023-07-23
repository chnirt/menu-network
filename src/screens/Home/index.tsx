import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

const Home = () => {
  const auth = useAuth();
  return <Outlet context={auth} />;
};

export default Home;
