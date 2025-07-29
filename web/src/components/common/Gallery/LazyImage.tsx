import React, { useState, useEffect, useRef } from 'react';
import { Spin } from 'antd';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: React.ReactNode;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className, 
  style,
  placeholder,
  objectFit = 'cover'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={imgRef} className={className} style={style}>
      {!isInView || !isLoaded ? (
        <div className="image-placeholder" style={{ width: '100%', height: '100%' }}>
          {placeholder || <Spin />}
        </div>
      ) : null}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{
            display: isLoaded ? 'block' : 'none',
            width: '100%',
            height: '100%',
            objectFit: objectFit
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;