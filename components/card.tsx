import React, { useState } from 'react';
import Link from 'next/link';
import NextImage from './image';
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
  const image = item.attributes?.originalImage;
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
    <div className={className}>
      <Link href={`/works/${encodeURIComponent(item?.attributes?.slug)}`}>
        <a>
          <div
            className="absolute h-full w-full"
            style={{ filter: `blur(${blurValue}px)` }}
            onMouseMove={handleOnMouseMove}
          >
            <NextImage image={image} alt="scene" />
          </div>
          {!isCompact && (
            <div
              className="z-10 absolute w-48 h-48 rounded-full transition-opacity pointer-events-none opacity-0 viewer"
              style={{
                transform: `translate(${x}px,${y}px)`,
                background: `url(${getStrapiMedia(
                  image
                )}) ${-x}px ${-y}px no-repeat`,
              }}
            />
          )}
        </a>
      </Link>
    </div>
  );
};
