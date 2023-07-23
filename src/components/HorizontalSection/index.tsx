import { Image } from "antd-mobile";

const HorizontalSection = ({ data }: { data: any[] }) => {
  if (data?.length <= 0) return null;
  return (
    <div className="flex flex-row gap-4 overflow-x-auto snap-x p-4 scroll-pl-4 no-scrollbar">
      {data.map((dish: any, sii: number) => (
        <div
          id={`anchor-dish-${dish?.name}`}
          key={`section-item-${sii}`}
          className={`snap-start 
            drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)] pt-2 px-2 pb-4 bg-white rounded-[1.125rem] flex-none w-1/3 gap-2`}
        >
          <Image
            className="rounded-[0.75rem] w-full border"
            src={dish?.photo}
            alt={`dish-${sii}-${dish?.name}`}
          />
          <div>
            <div className="truncate">{dish?.name}</div>
            <div className="truncate">{dish?.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalSection;
