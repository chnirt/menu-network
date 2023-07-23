import { Skeleton as ANTDSkeleton } from "antd-mobile";

const Skeleton = ({ screens }: { screens: string }) => {
  switch (screens) {
    case "menu": {
      return (
        <div>
          <div className="flex flex-row gap-5">
            <ANTDSkeleton.Title animated />
            <ANTDSkeleton.Title animated />
            <ANTDSkeleton.Title animated />
          </div>
          <ANTDSkeleton.Paragraph lineCount={10} animated />
        </div>
      );
    }
    default: {
      return null;
    }
  }
};

export default Skeleton;
