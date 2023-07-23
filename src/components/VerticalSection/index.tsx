import { Image } from "antd-mobile";

const VerticalSection = ({ data }: { data: any[] }) => {
  if (data?.length <= 0) return null;
  return (
    <div className="flex flex-col gap-4 px-4">
      {data.map((dish: any, sii: number) => (
        <div
          id={`anchor-dish-${dish?.name}`}
          key={`section-item-${sii}`}
          className={`snap-start 
            drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)] p-2 bg-white rounded-[1.125rem] flex-none w-full`}
        >
          <div className="flex items-start justify-start gap-2">
            <div className="w-1/3">
              <Image
                className="rounded-[0.75rem] w-full border"
                src={dish?.photo}
                alt={`dish-${sii}-${dish?.name}`}
              />
            </div>
            <div className="w-2/3 flex-col">
              <div className="truncate">{dish?.name}</div>
              <div className="truncate">{dish?.price}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalSection;
