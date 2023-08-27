import { Image } from 'antd-mobile'
import Counter from '../Counter'

const DishItem = ({ item, count, onChangeValue }: any) => {
  return (
    <div className="flex items-center">
      <div className="mr-3">
        <Image
          className="rounded-3xl [&_img]:m-0"
          src={item.photo ?? ''}
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
        <div className="flex-none flex justify-between items-center">
          {item?.price ? (
            <p className="m-0 text-base font-semibold">{item.price}</p>
          ) : null}
          <Counter
            min={0}
            max={10}
            value={count || 0}
            onChangeValue={onChangeValue}
          />
        </div>
      </div>
    </div>
  )
}

export default DishItem
