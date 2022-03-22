/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import Link from 'next/link';
import NextImage from '../components/image';
import React, { useEffect, useState, WheelEvent } from 'react';
import Layout from '../components/layout';
import { fetchAPI } from '../lib/api';
import Card from '../components/card';
import { getStrapiMedia } from '../lib/media';
import Image from 'next/image';

const SampleCard = ({ cardData }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0, xs: 0, ys: 0 });
  const { x, y, xs, ys } = coords;
  // console.log(x, y);

  return (
    // <div className="relative w-[533px] h-[533px] cursor-pointer overflow-hidden inline-table border border-teal-500 blur-parent shrink-0">

    <div className="relative shrink-0 w-[533px] h-[533px]">
      <img
        src={getStrapiMedia(cardData.attributes.image)}
        alt="scene"
        // className="absolute top-0 bottom-0 right-0 left-0 m-auto w-[533px] h-[533px] text-center overflow-hidden blur-md blur-scene"
        className="w-full h-auto relative blur-md"
        onMouseMove={(e) => {
          console.log(
            e.clientX,
            e.currentTarget?.getBoundingClientRect(),
            e.currentTarget?.offsetWidth,
            e.clientY,
            e.currentTarget?.clientWidth,
            e.currentTarget?.clientHeight
          );

          const rect = e.currentTarget?.getBoundingClientRect();
          const halfViewer = e.currentTarget?.offsetWidth / 2;

          setCoords(() => ({
            x: e.clientX - rect.left - halfViewer,
            y: e.clientY - rect.top - halfViewer,
            xs: e.currentTarget?.clientWidth,
            ys: e.currentTarget?.clientHeight,
          }));
        }}
      />
      <img
        src={getStrapiMedia(cardData.attributes.image)}
        alt="viewer"
        // className="z-10 absolute w-24 h-24 rounded-full pointer-events-none opacity-0  transition-opacity blur-viewer bg-[length:533px_533px]"
        className="absolute top-0 left-0 block pointer-events-none"
        style={{
          transform: `translate(${x}px,${y}px)`,
          backgroundPosition: `${-x}px ${-y}px`,
          backgroundSize: `20% 20%`,
        }}
      />
    </div>
  );
};

const Home = ({
  categories,
  homepage,
  articles,
}: {
  articles: any;
  categories: any;
  homepage: any;
}) => {
  // TODO: Левый и правый блок вынести в отдельные компоненты

  return (
    <Layout categories={categories}>
      {/* Text block */}
      <div className="flex flex-col px-4 justify-around w-screen gap-5 pt-4 md:pt-8 md:gap-10 lg:gap-0 lg:px-5 lg:border-r lg:border-yellow-500 lg:w-[42vw]">
        <p className="text-base md:text-xl xl:text-2xl">
          All works are blured until we dive into the process and restrictions.
        </p>
        <div className="md:text-base">
          With hover you could pry about the final decisions but don’t have a
          clue why they was made.
        </div>
      </div>

      <div
        className="mx-4 flex gap-10 items-center overflow-x-hidden w-screen pb-4 md:pb-8 lg:w-[54vw] lg:mx-10"
        onWheel={(e: WheelEvent<HTMLDivElement>) => {
          e.currentTarget.scrollLeft += e.deltaY;
        }}
      >
        {articles?.map((x, i) => (
          // <SampleCard cardData={x} key={i} />
          <Card
            cardData={x}
            key={i}
            className="w-[252px] h-[533px] md:w-[403px] md:h-[533px] xl:w-[520px] xl:h-[632px] shrink-0 relative"
          />
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI('/articles', { populate: '*' }),
    fetchAPI('/categories', { populate: '*' }),
    fetchAPI('/homepage', {
      populate: {
        hero: '*',
        seo: { populate: '*' },
      },
    }),
  ]);

  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  };
};

export default Home;
