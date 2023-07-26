import { Button } from "antd-mobile";

const ListHeader = ({
  title,
  onClickNewDish,
  readOnly,
}: {
  title: string;
  onClickNewDish?: () => void;
  readOnly?: boolean;
}) => {
  return (
    <div className="flex justify-between py-2">
      {title}

      {!readOnly ? (
        <Button
          color="primary"
          fill="none"
          size="mini"
          onClick={onClickNewDish}
        >
          NEW DISH
        </Button>
      ) : null}
    </div>
  );
};

export default ListHeader;
