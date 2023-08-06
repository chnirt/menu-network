import { Button } from "antd-mobile";

const ListHeader = ({
  title,
  onClickNewList,
  readOnly,
}: {
  title: string;
  onClickNewList?: () => void;
  readOnly?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center h-10">
      {title}

      {!readOnly ? (
        <Button
          color="primary"
          fill="none"
          size="mini"
          onClick={onClickNewList}
        >
          NEW DISH
        </Button>
      ) : null}
    </div>
  );
};

export default ListHeader;
