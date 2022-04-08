/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import React, { WheelEvent } from 'react';
import Layout from '../components/layout';
import { fetchAPI } from '../lib/api';
import { SampleCard } from '../components/card';

const Home = ({ homepage, works }: { works: any; homepage: any }) => {
  // TODO: Левый и правый блок вынести в отдельные компоненты
  return (
    <Layout>
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
        {works?.map((x, i) => (
          <SampleCard
            item={x}
            blurValue={12}
            key={i}
            className="relative shrink-0 w-[252px] h-[533px] md:w-[403px] md:h-[533px] xl:w-[520px] xl:h-[632px] wrap"
          />
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
  const [worksRes, homepageRes] = await Promise.all([
    fetchAPI('/works', { populate: '*' }),
    fetchAPI('/homepage', {
      populate: {
        hero: '*',
        seo: { populate: '*' },
      },
    }),
  ]);

  return {
    props: {
      works: worksRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  };
};

export default Home;
