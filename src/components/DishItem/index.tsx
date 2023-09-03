import { Image } from 'antd-mobile'
import Counter from '../Counter'
import useAuth from '../../hooks/useAuth'

const DishItem = ({ item, count, onChangeValue, disabled }: any) => {
  const { user } = useAuth()
  const formatPrice =
    user?.currency === 'vnd'
      ? Number(item?.price).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })
      : user?.currency === 'usd'
      ? Number(item?.price).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
      : item?.price
  return (
    <div className="flex items-center">
      <div className="mr-3">
        <Image
          className="rounded-3xl [&_img]:m-0"
          src={item?.photo ?? ''}
          fit="cover"
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-1 flex-col no-underline gap-1">
        <div className="flex-1 flex flex-col">
          {item?.name ? (
            <p className="m-0 text-base font-bold">{item.name}</p>
          ) : null}
          {item?.description ? (
            <p className="m-0 line-clamp-2 text-xs text-[#999999]">
              {item.description}
            </p>
          ) : null}
        </div>
        <div className="flex-none">
          {item?.price ? (
            <div className="flex justify-between items-center">
              <p className="m-0 text-base font-semibold">{formatPrice}</p>
              <Counter
                min={0}
                max={10}
                value={count || 0}
                onChangeValue={onChangeValue}
                disabled={disabled}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default DishItem
