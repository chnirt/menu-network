import { Card, NavBar } from 'antd-mobile'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import RQRCode from 'qrcode.react'
import { ORIGIN } from '../../constants'

const QRCode = () => {
  const navigate = useNavigate()
  const { menuId } = useParams()
  const location = useLocation()
  return (
    <div>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
      >
        QR CODE
      </NavBar>
      <Card className="flex justify-center items-center aspect-square p-0 adm-list-card">
        <div className="[&_svg]:block [&_svg]:w-64 [&_svg]:h-auto">
          <RQRCode
            renderAs="svg"
            value={`${ORIGIN}/menu/${menuId}`}
            imageSettings={{
              src: location.state?.logo ?? `${ORIGIN}/favicon.png`,
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>
      </Card>
    </div>
  )
}

export default QRCode
