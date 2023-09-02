import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Image, NavBar, Rate, Swiper } from 'antd-mobile'
import { routes } from '../../routes'
import { useCallback } from 'react'
import useOrder from '../../hooks/useOrder'

const Dish = () => {
  const navigate = useNavigate()
  const { dishId } = useParams()
  const location = useLocation()
  const { addOrder, order } = useOrder()
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
        <div className="divide-y">
          {dish?.dishDescription ? (
            <div className="h-14">{dish.dishDescription}</div>
          ) : null}
          <div
            className="pt-3 flex justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {dish?.price ? <div>{dish.price}</div> : null}
            <Button color="primary" shape="rounded" onClick={handleOrder}>
              Order
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Dish
