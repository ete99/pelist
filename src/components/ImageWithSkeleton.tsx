/**
 * A component that displays an image with a skeleton loading animation.
 *
 * @component
 * @example
 * ```tsx
 * import React from "react";
 * import ImageLikeSkeleton from "./ImageWithSkeleton";
 *
 * const App: React.FC = () => {
 *   return (
 *     <div>
 *       <ImageLikeSkeleton src="image.jpg" alt="Image" className="image" />
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 */
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
        onError={(e) => {
          if (e.currentTarget.src !== "/logo512.png") {
            e.currentTarget.src = "/logo512.png";
          }
          e.currentTarget.src = "/logo512.png";
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default ImageLikeSkeleton;
