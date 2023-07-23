import { Card, NavBar } from "antd-mobile";
import { useNavigate, useParams } from "react-router-dom";
import RQRCode from "qrcode.react";

const QRCode = () => {
  const navigate = useNavigate();
  let { menuId } = useParams();
  return (
    <div>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
      >
        QR CODE
      </NavBar>
      <Card className="flex justify-center">
        <div className="[&_svg]:block [&_svg]:w-full [&_svg]:h-auto">
          <RQRCode
            renderAs="svg"
            level="H"
            value={`${window.location.origin}/menu/${menuId}`}
          />
        </div>
      </Card>
    </div>
  );
};

export default QRCode;
