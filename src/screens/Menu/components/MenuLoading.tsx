import { Skeleton } from 'antd-mobile'

const MenuLoading = () => {
  return (
    <div>
      <div className="flex">
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Skeleton.Title
              key={`sk-menu-tab-${i}`}
              className="mx-3 !w-1/3"
              animated
            />
          ))}
      </div>
      <div>
        {Array(3)
          .fill(null)
          .map((_, ii) => (
            <div key={`sk-tab-content-${ii}`}>
              <div className="flex justify-between">
                <Skeleton.Title className="!w-1/4" animated />
                <Skeleton.Title className="!w-1/4" animated />
              </div>
              {Array(3)
                .fill(null)
                .map((_, iii) => (
                  <div key={`sk-tab-content-sub-${iii}`} className="flex">
                    <div className="flex w-full">
                      <div className="pr-3">
                        <Skeleton.Title
                          className="!w-8 !h-8 !rounded-full"
                          animated
                        />
                      </div>
                      <Skeleton.Title className="!w-1/4" animated />
                    </div>
                    <Skeleton.Title className="!w-1/4" animated />
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default MenuLoading
