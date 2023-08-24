import { useContext } from "react";
import { MenuContext } from "../context/Menu";

const useMenu = () => useContext(MenuContext);

export default useMenu;
