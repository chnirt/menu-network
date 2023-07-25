import { Button } from "antd-mobile";

const ListHeader = ({
  title,
  onClickNewDish,
}: {
  title: string;
  onClickNewDish?: () => void;
}) => {
  return (
    <div className="flex justify-between py-2">
      {title}

      <Button color="primary" fill="none" size="mini" onClick={onClickNewDish}>
        NEW DISH
      </Button>
    </div>
  );
};

export default ListHeader;
