/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import React, { WheelEvent } from 'react';
import Layout from '../components/layout';
import { fetchAPI } from '../lib/api';
import { SampleCard } from '../components/card';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { marked } from 'marked';

const Home = ({ works, homepage }: { works: any; homepage: any }) => {
  const router = useRouter();
  const markedHtml = marked.parse(homepage?.description);
  const handleOnScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollPercent =
      e.currentTarget?.scrollLeft /
      (e.currentTarget?.scrollWidth - e.currentTarget?.clientWidth);

    if (scrollPercent === 1) {
      setTimeout(() => router.push('/works'), 1000);
    }
  };

  // TODO: Левый и правый блок вынести в отдельные компоненты
  return (
    <Layout>
      <div className="flex flex-col px-4 justify-around w-screen gap-5 pt-4 md:pt-8 md:gap-10 lg:gap-0 lg:px-5 lg:border-r lg:border-yellow-500 lg:w-[42vw]">
        <p className="text-base md:text-xl xl:text-2xl">{homepage?.title}</p>
        <div
          className="md:text-base"
          dangerouslySetInnerHTML={{
            __html: markedHtml,
          }}
        />
      </div>

      <div
        className="mx-4 flex gap-10 items-center overflow-x-scroll overflow-y-hidden lg:overflow-hidden w-screen my-4 lg:w-[54vw] lg:px-10"
        onWheel={(e: WheelEvent<HTMLDivElement>) => {
          // TODO: Вынести в глобальные переменные
          if (window.innerWidth >= 1024) {
            e.currentTarget.scrollLeft += e.deltaY;
          }
        }}
        onScroll={handleOnScroll}
      >
        {works?.map((x) => {
          return (
            <Link
              key={x?.attributes?.slug}
              href={`/works/${encodeURIComponent(x?.attributes?.slug)}`}
            >
              <a className="select-none">
                <SampleCard
                  item={x}
                  blurValue={12}
                  className="select-none relative shrink-0 w-[252px] h-[533px] md:w-[403px] md:h-[533px] xl:w-[520px] xl:h-[632px] wrap"
                />
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [worksRes, homepageRes] = await Promise.all([
    fetchAPI('/works', { populate: '*' }),
    fetchAPI('/homepage', { populate: '*' }),
  ]);
  return {
    props: {
      works: worksRes.data,
      homepage: homepageRes.data.attributes,
    },
  };
};

export default Home;
