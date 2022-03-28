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

const SampleCard = ({ cardData, articles }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const { x, y } = coords;

  return (
    <div className="relative shrink-0 w-[252px] h-[533px] md:w-[403px] md:h-[533px] xl:w-[520px] xl:h-[632px] wrap">
      <Link href={`/works/1`}>
        <a>
          <NextImage
            image={cardData.attributes.image}
            alt="scene"
            className="w-full h-auto absolute blur-md"
            onMouseMove={(e) => {
              const rect = e.currentTarget?.getBoundingClientRect();
              setCoords(() => ({
                x: e.clientX - rect.left - rect.width / 2 + 192,
                y: e.clientY - rect.top - rect.height / 2 + 192,
              }));
            }}
          />
          <div
            className="z-10 absolute w-48 h-48 rounded-full transition-opacity pointer-events-none opacity-0 viewer"
            style={{
              transform: `translate(${x}px,${y}px)`,
              background: `url(${getStrapiMedia(
                cardData?.attributes?.image
              )}) ${-x}px ${-y}px no-repeat`,
            }}
          />
        </a>
      </Link>
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
        className="mx-4 flex gap-10 items-center overflow-x-scroll overflow-y-hidden lg:overflow-hidden w-screen my-4 lg:w-[54vw] lg:mx-10"
        onWheel={(e: WheelEvent<HTMLDivElement>) => {
          // TODO: Вынести в глобальные переменные
          if (window.innerWidth >= 1024) {
            e.currentTarget.scrollLeft += e.deltaY;
          }
        }}
      >
        {articles?.map((x, i) => (
          <SampleCard cardData={x} articles={articles} key={i} />
          // <Card
          //   cardData={x}
          //   key={i}
          //   className="w-[252px] h-[533px] md:w-[403px] md:h-[533px] xl:w-[520px] xl:h-[632px] shrink-0 relative"
          // />
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
