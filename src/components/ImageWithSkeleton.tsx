import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

interface ImageLikeSkeletonProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageLikeSkeleton: React.FC<ImageLikeSkeletonProps> = ({
  src,
  alt,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Skeleton className={className + " h-96"} />}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          display: isLoading ? "none" : "block",
        }}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ImageLikeSkeleton;
