import { SpinLoading } from "antd-mobile";

export default () => {
  return (
    <div
      role="status"
      className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
    >
      <SpinLoading color="primary" />
    </div>
  );
};
