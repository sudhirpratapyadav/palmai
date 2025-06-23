
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
}

const BlurImage: React.FC<BlurImageProps> = ({
  src,
  alt,
  className = "",
  skeletonClassName = "",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`transition-all duration-700 ease-in-out w-full h-full object-contain rounded-xl
          ${loaded ? "opacity-100 blur-0" : "opacity-40 blur-lg"}
        `}
        style={{
          position: "relative",
          zIndex: 2,
          display: "block",
        }}
        draggable={false}
        {...props}
      />
      {!loaded && (
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
          {/* Subtle hand-shaped shimmer using a radial gradient instead of a rectangular skeleton */}
          <div
            className={`animate-pulse rounded-full blur-[6px] bg-gradient-radial from-purple-300/40 via-pink-200/20 to-transparent w-[65%] h-[85%]`}
            style={{
              minWidth: "120px",
              minHeight: "180px",
              maxWidth: "95%",
              maxHeight: "95%",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BlurImage;
