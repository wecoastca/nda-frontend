import React, { useEffect, useRef, useState } from 'react';
import { Image } from './image';
import { getStrapiMedia } from '../lib/media';

type SampleCardPropsType = {
  item: any;
  blurValue?: number;
  className?: any;
  isCompact?: boolean;
};

export const SampleCard = ({
  item,
  blurValue = 0,
  className,
  isCompact = false,
}: SampleCardPropsType) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [backgroundImageSize, setBackgroundImageSize] = useState({
    width: 0,
    height: 0,
  });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBackgroundImageSize({
      width: imageContainerRef?.current?.clientWidth,
      height: imageContainerRef?.current?.clientHeight,
    });
  }, [imageContainerRef]);

  const { originalImage, fakeImage, isNDA } = item.attributes;
  const fakeImageSrc = fakeImage?.data && getStrapiMedia(fakeImage);
  const { x, y } = coords;

  const handleOnMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    // TODO: Композиция компонентов, а не условия
    if (isCompact) {
      return;
    }
    const rect = e.currentTarget?.getBoundingClientRect();
    setCoords(() => ({
      x: e?.clientX - rect?.left - rect?.width / 4,
      y: e?.clientY - rect?.top - rect?.height / 4,
    }));
  };
  return (
    <div className={className + ' overflow-hidden'}>
      <div
        className="absolute h-full w-full"
        style={{ filter: `blur(${blurValue}px)` }}
        onMouseMove={handleOnMouseMove}
        onContextMenu={(e) => {
          e?.preventDefault();
        }}
        ref={imageContainerRef}
      >
        <Image
          image={originalImage}
          alt={originalImage.data.attributes.alternativeText}
        />
        {fakeImageSrc && isNDA && (
          <img
            src={fakeImageSrc}
            alt={fakeImage.data.attributes.alternativeText}
            className="h-full w-full absolute"
            style={{ opacity: blurValue / 10 }}
          />
        )}
      </div>
      {!isCompact && blurValue !== 0 && (
        <div
          className="z-10 absolute w-48 h-48 rounded-full transition-opacity pointer-events-none opacity-0 viewer"
          style={{
            transform: `translate(${x}px,${y}px)`,
            backgroundImage: `url(${getStrapiMedia(originalImage)})`,
            backgroundPosition: `${-x}px ${-y}px`,
            backgroundSize: `${backgroundImageSize?.width}px ${backgroundImageSize?.height}px`,
          }}
        />
      )}
    </div>
  );
};
