import { getStrapiMedia } from '../lib/media';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

export type ImageProps = Partial<NextImageProps> & {
  image?: any;
};

const Image = ({ image, ...otherProps }: ImageProps) => {
  const { alternativeText } = image.data.attributes;

  return (
    //@ts-ignore
    <NextImage
      layout="fill"
      objectFit="cover"
      src={getStrapiMedia(image)}
      alt={alternativeText || ''}
      {...otherProps}
    />
  );
};

export default Image;
