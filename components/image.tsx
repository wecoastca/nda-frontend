import { getStrapiMedia } from '../lib/media';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

export type ImageProps = Partial<NextImageProps> & {
  image?: any;
};

const Image = ({ image, ...otherProps }: ImageProps) => {
  const { url, alternativeText, width, height } = image.data.attributes;

  // const loader = () => {
  //   return getStrapiMedia(image)
  // }

  return (
    //@ts-ignore
    <NextImage
      // loader={loader}
      layout="fill"
      objectFit="cover"
      src={getStrapiMedia(image)}
      alt={alternativeText || ''}
      {...otherProps}
    />
  );
};

export default Image;
