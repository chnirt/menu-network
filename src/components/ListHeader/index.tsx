import { Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const ListHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      {title}

      <Button
        color="primary"
        fill="none"
        size="mini"
        onClick={() => navigate(routes.newDish)}
      >
        NEW DISH
      </Button>
    </div>
  );
};

export default ListHeader;
