import { SpinLoading } from 'antd-mobile'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { ORIGIN } from '../../constants'

const Loading = () => {
  return (
    <div
      role="status"
      className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 flex flex-col justify-center items-center"
    >
      <div className="flex justify-center items-center">
        <LazyLoadImage
          className="w-8 aspect-square"
          src={`${ORIGIN}/favicon.png`}
        />
        Menu Network App
      </div>
      <SpinLoading color="primary" />
    </div>
  )
}

export default Loading
