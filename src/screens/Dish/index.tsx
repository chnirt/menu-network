import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Image, NavBar, Rate, Swiper } from 'antd-mobile'
import { routes } from '../../routes'

const Dish = () => {
  const navigate = useNavigate()
  const { dishId } = useParams()
  const location = useLocation()
  const dish = location.state?.dish
  if (dishId === undefined || dish === undefined)
    return <Navigate to={routes.error} />
  return (
    <div>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
      >
        Dish
      </NavBar>

      <Swiper>
        {dish?.dishFiles.map((dishFile: string, index: number) => (
          <Swiper.Item key={`swiper-${index}`}>
            <Image src={dishFile} fit="cover" />
          </Swiper.Item>
        ))}
      </Swiper>

      <Card
        title={<div style={{ fontWeight: 'bold' }}>{dish?.dishName}</div>}
        extra={<Rate allowHalf defaultValue={5} readOnly />}
        // onBodyClick={onBodyClick}
        // onHeaderClick={onHeaderClick}
        style={{ borderRadius: '16px' }}
      >
        <div className="h-14">Description</div>
        <div
          className="pt-3 border-t flex justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div>{dish.price}</div>
          <Button color="primary" shape="rounded" disabled>
            Order
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Dish
