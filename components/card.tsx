import React from 'react';
import Link from 'next/link';
import NextImage from './image';

const Card = ({
  cardData,
  className,
  imageProps,
  isBlured,
}: {
  cardData?: any;
  className?: any;
  imageProps?: any;
  isBlured?: boolean;
}) => {
  return (
    <div className={className}>
      <Link href={`/works/1`}>
        <a>
          {isBlured && <div className={''}></div>}
          <NextImage image={cardData.attributes.image} {...imageProps} />
        </a>
      </Link>
    </div>
  );
};

export default Card;
