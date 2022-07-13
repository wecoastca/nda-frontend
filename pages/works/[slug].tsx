import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SampleCard } from '../../components/card';
import { debounce } from 'lodash';
import { marked } from 'marked';
import NextImage from 'next/image';
import { getStrapiMedia } from '../../lib/media';
import { NavButton } from '../../components/navButton';
import { Modal } from '../../components/modal';

const Work = ({ works }) => {
  const router = useRouter();
  const currentWork = works?.find(
    (x) => x?.attributes?.slug == router?.query?.slug
  );
  const { description, id, ...currentDescription } =
    currentWork?.attributes?.workDescription;
  const { slug } = currentWork?.attributes;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [blur, setBlur] = useState({ default: 10, current: 10 });
  const [isCompact, setIsCompact] = useState(false);
  const markedHtml = marked.parse(description);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsCompact(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    if (
      scrollableRef.current?.clientHeight ===
      scrollableRef.current?.scrollHeight
    ) {
      setBlur((blur) => ({ ...blur, current: 0 }));
    } else {
      scrollableRef.current?.scroll(0, 0);
    }
  }, [router?.query?.slug, scrollableRef]);

  const currIndex = works.findIndex((w) => w.attributes.slug === slug);

  const handleClickNextWork = () => {
    const nextWorkSlug =
      currIndex + 1 === works.length
        ? works[0].attributes.slug
        : works[currIndex + 1].attributes.slug;

    router?.push(`${nextWorkSlug}`);
    setBlur((blur) => ({ ...blur, current: 10 }));
  };

  const handleClickPreviousWork = () => {
    const prevWorkSlug =
      currIndex === 0
        ? works[works.length - 1].attributes.slug
        : works[currIndex - 1].attributes.slug;
    router?.push(`${prevWorkSlug}`);
    setBlur((blur) => ({ ...blur, current: 10 }));
  };

  const handleCardClick = (e) => {
    // Временное решение, раздели на два компонента
    if (window.innerWidth < 1024) {
      setIsModalVisible(!isModalVisible);
    }
  };

  const debouncedBlurSet = debounce((scrollTop, scrollHeight, clientHeight) => {
    const scrollPercent = Number(
      (scrollTop / (scrollHeight - clientHeight)).toPrecision(1)
    );

    setBlur((blur) => ({
      ...blur,
      current: blur?.default - scrollPercent * blur?.default,
    }));
  }, 300);

  const handleOnScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    debouncedBlurSet(
      e.currentTarget?.scrollTop,
      e.currentTarget?.scrollHeight,
      e.currentTarget?.clientHeight
    );
  };

  const handleOnWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (
        scrollableRef.current?.clientHeight !==
        scrollableRef.current.scrollHeight
      ) {
        scrollableRef.current.scrollBy(0, e.deltaY);
      }
    },
    [scrollableRef]
  );

  return (
    <Layout
      sidebarProps={{
        children: (
          <NavButton
            onClick={handleClickPreviousWork}
            direction="left"
            className="hidden mx-auto lg:block hover:opacity-60"
          />
        ),
      }}
      layoutContainerProps={{
        onKeyDown: (e) => {
          if (e?.key === 'ArrowLeft') {
            handleClickPreviousWork();
          }
          if (e?.key === 'ArrowRight') {
            handleClickNextWork();
          }
        },
        onWheel: handleOnWheel,
        tabIndex: -1,
      }}
    >
      {/* Nav mobile */}
      <div className="flex justify-between w-screen sticky border-b border-[#FA6400] h-12 px-4 md:px-5 md:h-16 lg:hidden">
        <NavButton
          onClick={handleClickPreviousWork}
          direction="left"
          className="active:opacity-60"
        />
        <NavButton
          onClick={handleClickNextWork}
          direction="right"
          className="active:opacity-60"
        />
      </div>
      <div
        onScroll={handleOnScroll}
        ref={scrollableRef}
        className="w-screen h-full px-4 pt-6 pb-4 overflow-scroll flex flex-col gap-8 lg:px-6 lg:border-r lg:border-[#FA6400] lg:w-[42vw] 2xl:px-8 2xl:pt-12"
      >
        <div
          className="relative w-min flex gap-5"
          style={
            currentWork?.attributes.categories.data.length === 0
              ? { display: 'none' }
              : {}
          }
        >
          {currentWork?.attributes.categories.data.map((c) => (
            <div key={c?.id}>
              <div
                className={`blur-md h-8 absolute -z-10`}
                style={{
                  background: c?.attributes?.color,
                  width: c?.attributes?.name.length * 12,
                }}
              ></div>
              <button
                className={`inline-block hover:opacity-20`}
                value={c?.attributes?.name}
                onClick={(e) => {
                  router.push(`/works?c=${e.currentTarget?.value}`);
                }}
              >
                <span className="text-base z-10">{c?.attributes?.name}</span>
              </button>
            </div>
          ))}
        </div>

        <p className="text-lg md:text-2xl lg:text-xl xl:text-2xl">
          {currentWork?.attributes?.title}
        </p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 md:gap-x-28 lg:gap-x-16 xl:gap-x-32">
          {Object.entries(currentDescription).map(([clearKey, value]) => {
            const key = clearKey.replace(
              /[A-Z]/g,
              (match) => ` ${match.toLowerCase()}`
            );
            if (typeof value === 'object') {
              return (
                <React.Fragment key={key}>
                  <div className="text-base self-center">{key}</div>
                  <div className="w-16 md:w-20">
                    <NextImage
                      layout="responsive"
                      // @ts-ignore
                      width={value.data.attributes.width}
                      // @ts-ignore
                      height={value.data.attributes.height}
                      src={getStrapiMedia(value)}
                      // @ts-ignore
                      alt={value.data.attributes.alternativeText}
                    />
                  </div>
                </React.Fragment>
              );
            }
            return (
              <React.Fragment key={key}>
                <div className="text-base self-center">{key}</div>
                <div className="text-xs md:text-lg self-center">{value}</div>
              </React.Fragment>
            );
          })}
        </div>
        <div
          className="text-xs md:text-lg"
          dangerouslySetInnerHTML={{
            __html: markedHtml,
          }}
        />
      </div>

      <div className="lg:h-full lg:w-[54vw] lg:flex lg:items-center lg:justify-center">
        <button
          onClick={handleCardClick}
          className="w-[139px] h-[184px] absolute right-4 bottom-14 md:w-[233px] md:h-[309px] md:right-11 md:bottom-24 lg:relative lg:right-auto lg:bottom-auto lg:w-[75%] lg:h-[78%] lg:cursor-default"
        >
          <SampleCard
            item={currentWork}
            blurValue={blur?.current}
            className="relative shrink-0 h-full w-full wrap"
            isCompact={isCompact}
          />
        </button>
      </div>
      <div className="absolute top-[44%] right-[-46px] border-2 hover:border-4 rounded-full hover:opacity-60 border-[#F9B78B] hover:border-[rgb(249,183,139,0.6)] hidden lg:block">
        <NavButton
          onClick={handleClickNextWork}
          direction="right"
          className="m-10 relative right-5"
        />
      </div>
      <Modal
        isVisible={isModalVisible}
        onBackButtonClick={() => setIsModalVisible(!isModalVisible)}
      >
        <div className="relative w-[90%] h-[48%] md:h-[77%]">
          <SampleCard
            item={currentWork}
            className="relative shrink-0 h-full w-full wrap"
            blurValue={blur?.current}
          />
        </div>
      </Modal>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [categoriesRes, worksRes] = await Promise.all([
    fetchAPI('/categories', { populate: '*' }),
    fetchAPI('/works', {
      populate: [
        'originalImage',
        'workDescription.customer',
        'fakeImage',
        'categories',
      ],
    }),
  ]);
  return {
    props: {
      categories: categoriesRes.data,
      works: worksRes.data,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await fetchAPI('/works');

  const paths = data.map((w) => ({
    params: { slug: `${w?.attributes?.slug}` },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Work;
