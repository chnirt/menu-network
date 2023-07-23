import { Outlet } from "react-router-dom";
import BottomTabBar from "../../components/BottomTabBar";

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <div className="border-t sticky bottom-0">
        <BottomTabBar />
      </div>
    </div>
  );
};

export default App;
