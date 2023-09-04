import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Image, NavBar, Rate, Swiper } from 'antd-mobile'
import { routes } from '../../routes'
import { useCallback } from 'react'
import useOrder from '../../hooks/useOrder'
import useAuth from '../../hooks/useAuth'

const Dish = () => {
  const navigate = useNavigate()
  const { dishId } = useParams()
  const location = useLocation()
  const { addOrder, order } = useOrder()
  const { user } = useAuth()
  const dish = location.state?.dish
  const handleOrder = useCallback(() => {
    if (dishId === undefined) return
    const foundOrder = order?.find((dish: any) => dish?.dishId === dishId)
    addOrder({
      dishId,
      count: foundOrder ? foundOrder?.count + 1 : 1,
    })
    navigate(-1)
  }, [dishId, addOrder, navigate, order])
  const formatPrice =
    user?.currency === 'vnd'
      ? Number(dish?.price).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })
      : user?.currency === 'usd'
      ? Number(dish?.price).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
      : dish?.price
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
            <Image
              className="w-full aspect-square"
              src={dishFile}
              fit="cover"
            />
          </Swiper.Item>
        ))}
      </Swiper>

      <Card
        className="adm-list-card"
        title={<div style={{ fontWeight: 'bold' }}>{dish.dishName}</div>}
        extra={<Rate allowHalf defaultValue={5} readOnly />}
        // onBodyClick={onBodyClick}
        // onHeaderClick={onHeaderClick}
        style={{ borderRadius: '16px' }}
      >
        <div className="flex flex-col gap-3">
          {dish?.dishDescription ? <div>{dish.dishDescription}</div> : null}
          <div
            className="flex justify-between items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {dish?.price ? <div>{formatPrice}</div> : null}
            <Button color="primary" shape="rounded" onClick={handleOrder}>
              Add
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Dish
