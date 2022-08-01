import { getStrapiMedia } from '../lib/media';
import NextImage from 'next/image';

export const Logo = ({ image }) => (
  <NextImage
    layout="fill"
    src={getStrapiMedia(image)}
    alt={image?.data?.attributes?.alternativeText}
    priority
  />
);
