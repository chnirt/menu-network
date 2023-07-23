import { ErrorBlock, NavBar } from "antd-mobile";

const Order = () => {
  return (
    <div>
      <NavBar className="sticky top-0 z-[100] bg-white" back={null}>
        ORDER
      </NavBar>
      <ErrorBlock
        className="flex flex-col justify-center items-center"
        fullPage
        title="Best Coming Soon"
        description="We're working on something amazing, and we can't wait to share it with
        you. Stay tuned!"
      />
    </div>
  );
};

export default Order;
