import { Button, List, NavBar } from 'antd-mobile'
import useOrder from '../../hooks/useOrder'
import { Link, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { routes } from '../../routes'

const Order = () => {
  const navigate = useNavigate()
  const { order } = useOrder()

  const right = useMemo(
    () => (
      <Link to={routes.menu}>
        <Button color="primary" fill="none" size="mini">
          MENU
        </Button>
      </Link>
    ),
    []
  )

  return (
    <div>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
        right={right}
      >
        NEW ORDER
      </NavBar>
      <List header="Order1" mode="card">
        {order?.length > 0
          ? order?.map((dish, di: number) => (
              <List.Item key={`dish-${di}`}>{dish.dishId}</List.Item>
            ))
          : null}
      </List>
    </div>
  )
}

export default Order
