import { GetStaticProps } from 'next';
import React, { WheelEvent } from 'react';
import Layout from '../components/layout';
import { fetchAPI } from '../lib/api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { marked } from 'marked';
import NextImage from '../components/image';

const Home = ({ works, homepage }: { works: any; homepage: any }) => {
  const router = useRouter();
  const markedHtml = marked.parse(homepage?.attributes?.description);
  const handleOnScroll = () => {
    let timeoutId;
    return (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      clearTimeout(timeoutId);

      const scrollPercent =
        e.currentTarget?.scrollLeft /
        (e.currentTarget?.scrollWidth - e.currentTarget?.clientWidth);

      if (Math.floor(scrollPercent) === 1) {
        timeoutId = setTimeout(() => router.push('/works'), 3000);
      }
    };
  };

  // TODO: Левый и правый блок вынести в отдельные компоненты
  return (
    <Layout>
      <div className="flex flex-col px-4 justify-around w-screen gap-5 pt-4 md:pt-8 md:gap-10 lg:gap-0 lg:px-5 lg:border-r lg:border-[#FA6400] lg:w-[42vw]">
        <p className="text-base md:text-xl xl:text-2xl">
          {homepage?.attributes?.title}
        </p>
        <div
          className="md:text-base"
          dangerouslySetInnerHTML={{
            __html: markedHtml,
          }}
        />
      </div>

      <div
        className="ml-4 pr-16 flex gap-10 items-center overflow-x-scroll overflow-y-hidden lg:overflow-hidden w-screen my-4 lg:w-[54vw] lg:pl-10 lg:pr-24"
        onWheel={(e: WheelEvent<HTMLDivElement>) => {
          if (window.innerWidth >= 1024) {
            e.currentTarget.scrollLeft += e.deltaY;
          }
        }}
        onScroll={handleOnScroll()}
      >
        {works
          ?.filter((w) => w.attributes.isShowOnMain)
          .map((x) => (
            <Link
              key={x?.attributes?.slug}
              href={`/works/${encodeURIComponent(x?.attributes?.slug)}`}
            >
              <a className="select-none">
                <div className="select-none relative shrink-0 w-[252px] h-[533px] md:w-[403px] md:h-[533px] xl:w-[520px] xl:h-[632px] wrap">
                  <NextImage
                    image={x.attributes.originalImage}
                    alt={
                      x.attributes.originalImage.data.attributes.alternativeText
                    }
                  />
                </div>
              </a>
            </Link>
          ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [{ data: homepage }, { data: works }] = await Promise.all([
    fetchAPI('/homepage', { populate: '*' }),
    fetchAPI('/works', { populate: '*' }),
  ]);

  return {
    props: {
      homepage,
      works,
    },
    revalidate: 10,
  };
};

export default Home;
