import { Image, TextArea } from 'antd-mobile'
import Counter from '../Counter'
import useAuth from '../../hooks/useAuth'
import classNames from 'classnames'

const DishItem = ({ item, count, note, onChangeValue, disabled }: any) => {
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
    <div className="flex gap-3">
      <div>
        <Image
          className="rounded-3xl [&_img]:m-0"
          src={item?.photo ?? ''}
          fit="cover"
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-1 flex-col no-underline gap-3">
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
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="m-0 text-base font-semibold">{formatPrice}</p>
                <Counter
                  min={0}
                  max={10}
                  value={count ?? 0}
                  onChangeValue={(value: number) => {
                    onChangeValue({ count: value })
                  }}
                  disabled={disabled}
                />
              </div>
              <TextArea
                className={classNames(count > 0 ? 'flex' : 'hidden')}
                placeholder="Note"
                value={note ?? ''}
                onChange={(value: string) => {
                  onChangeValue({ count, note: value })
                }}
                onClick={(e) => e.stopPropagation()}
                maxLength={200}
                rows={3}
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
