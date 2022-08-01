import { GetStaticPaths, GetStaticProps } from 'next';
import { Modal, SampleCard, SwitchingLayout } from '../../components';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { marked } from 'marked';
import NextImage from 'next/image';
import { getStrapiMedia } from '../../lib/media';

type Work = {
  id: number;
  attributes: {
    title: string;
    isNDA: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    isShowOnMain: boolean;
    originalImage: Record<string, any>;
    fakeImage: Record<string, any>;
    categories: Record<string, any>;
    workDescription: {
      id: number;
      period: string;
      duration: string;
      projectPosition: string;
      tools: string;
      description: string;
      customer: Record<string, any>;
    };
  };
};

const Work = ({ work, slugs }: { work: Work; slugs: string[] }) => {
  const router = useRouter();

  const { slug, title, categories, workDescription } = work?.attributes;
  const { description: descriptionText, id, ...description } = workDescription;

  const currSlugI = slugs.indexOf(slug);
  const nextSlug = slugs[(currSlugI + 1) % slugs.length];
  const prevSlug = slugs[currSlugI - 1 < 0 ? slugs.length - 1 : currSlugI - 1];

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [blur, setBlur] = useState({ default: 10, current: 10 });
  const [isCompact, setIsCompact] = useState(false);
  const markedHtml = marked.parse(descriptionText);
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

  const handleClickNextWork = () => {
    router?.push(`${nextSlug}`);
    setBlur((blur) => ({ ...blur, current: 10 }));
  };

  const handleClickPreviousWork = () => {
    router?.push(`${prevSlug}`);
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
    <SwitchingLayout
      onNext={handleClickNextWork}
      onPrevious={handleClickPreviousWork}
      layoutContainerProps={{
        onWheel: handleOnWheel,
        tabIndex: -1,
      }}
    >
      {/* Main text content */}
      <div
        onScroll={handleOnScroll}
        ref={scrollableRef}
        className="w-screen h-full px-4 pt-6 pb-4 overflow-scroll flex flex-col gap-8 lg:px-6 lg:border-r lg:border-[#FA6400] lg:w-[42vw] 2xl:px-8 2xl:pt-12"
      >
        <div
          className="relative flex-wrap whitespace-nowrap flex gap-5"
          style={categories.data.length === 0 ? { display: 'none' } : {}}
        >
          {categories.data.map((c) => {
            const { color, name } = c.attributes;
            return (
              <div key={c?.id}>
                <div
                  className={`blur-md h-8 absolute -z-10`}
                  style={{
                    background: color,
                    width: name.length * 12,
                  }}
                ></div>
                <button
                  className={`inline-block hover:opacity-20`}
                  value={name}
                  onClick={(e) => {
                    router.push(`/works?c=${e.currentTarget?.value}`);
                  }}
                >
                  <span className="text-base z-10">{name}</span>
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-lg md:text-2xl lg:text-xl xl:text-2xl">{title}</p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 md:gap-x-28 lg:gap-x-16 xl:gap-x-32">
          {Object.entries(description).map(([clearKey, tableValue]) => {
            const key = clearKey.replace(
              /[A-Z]/g,
              (match) => ` ${match.toLowerCase()}`
            );
            if (typeof tableValue === 'object') {
              const { width, height, alternativeText } =
                tableValue?.data?.attributes;
              return (
                <React.Fragment key={key}>
                  <div className="text-base self-center">{key}</div>
                  <div className="w-16 md:w-20">
                    <NextImage
                      layout="responsive"
                      width={width}
                      height={height}
                      src={getStrapiMedia(tableValue)}
                      alt={alternativeText}
                    />
                  </div>
                </React.Fragment>
              );
            }
            return (
              <React.Fragment key={key}>
                <div className="text-base self-center">{key}</div>
                <div className="text-xs md:text-lg self-center">
                  {tableValue}
                </div>
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
      {/* Image content */}
      <div className="lg:h-full lg:w-[54vw] lg:flex lg:items-center lg:justify-center">
        <button
          onClick={handleCardClick}
          className="w-[139px] h-[184px] absolute right-4 bottom-14 md:w-[233px] md:h-[309px] md:right-11 md:bottom-24 lg:relative lg:right-auto lg:bottom-auto lg:w-[75%] lg:h-[78%] lg:cursor-default"
        >
          <SampleCard
            item={work}
            blurValue={blur?.current}
            className="relative shrink-0 h-full w-full wrap"
            isCompact={isCompact}
          />
        </button>
      </div>
      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackButtonClick={() => setIsModalVisible(!isModalVisible)}
      >
        <div className="relative w-[90%] h-[48%] md:h-[77%]">
          <SampleCard
            item={work}
            className="relative shrink-0 h-full w-full wrap"
            blurValue={blur?.current}
          />
        </div>
      </Modal>
    </SwitchingLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const { data: works } = await fetchAPI(`/works`, {
    populate: {
      originalImage: '*',
      fakeImage: '*',
      categories: '*',
      workDescription: {
        populate: '*',
      },
    },
  });

  const work = works.find((w) => w?.attributes?.slug === slug);
  const slugs = works.map((w) => w?.attributes?.slug).sort((a, b) => a - b);

  return {
    props: {
      work,
      slugs,
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
