
import { useState } from "react";

/**
 * Hook to compress and resize images to base64 JPEG.
 * @param maxDimension The maximum width or height in px. Default is 800.
 * @returns compressImage function and loading/error state.
 */
export function useCompressedImage(maxDimension: number = 800) {
  const [compressing, setCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Returns base64 string
  const compressImage = (file: File): Promise<string> => {
    setCompressing(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          let { width, height } = img;
          // Resize logic
          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height >= width && height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            setCompressing(false);
            setError("Canvas error");
            return reject(new Error("Canvas context not available"));
          }
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG base64 (quality 0.7)
          const base64 = canvas.toDataURL('image/jpeg', 0.7);
          setCompressing(false);
          resolve(base64);
        };
        img.onerror = (err) => {
          setCompressing(false);
          setError("Image load error");
          reject(err);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = (err) => {
        setCompressing(false);
        setError("File read error");
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  };

  return { compressImage, compressing, error };
}

