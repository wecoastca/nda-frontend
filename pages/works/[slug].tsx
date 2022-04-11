import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import React, { ButtonHTMLAttributes, FC, useCallback, useState } from 'react';
import NextImage from '../../components/image';
import { SampleCard } from '../../components/card';
import { debounce } from 'lodash';

const NavButton: FC<ButtonHTMLAttributes<any>> = ({
  onClick,
  children,
  ...otherProps
}) => {
  return (
    <button onClick={onClick && onClick} {...otherProps}>
      <svg
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </button>
  );
};

type WorkModalPropsType = {
  isVisible: boolean;
  onBackButtonClick?: () => void;
  ImageComponent?: React.ElementType;
};
const WorkModal: FC<WorkModalPropsType> = ({
  isVisible,
  onBackButtonClick,
  ImageComponent,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full h-full fixed z-10 bg-white top-0 flex flex-col lg:hidden lg:-z-10">
      <div className="border-b border-yellow-500 h-12 px-4 md:px-5 md:h-16 flex">
        <NavButton onClick={onBackButtonClick && onBackButtonClick}>
          <path
            d="M10.3409 21L12.0909 19.25L4.88636 12.0682H23.5455V9.56818H4.88636L12.0909 2.36364L10.3409 0.636364L0.159091 10.8182L10.3409 21Z"
            fill="black"
          />
        </NavButton>
      </div>
      <div className="flex justify-center items-center h-full">
        <ImageComponent />
      </div>
    </div>
  );
};

const Work = ({ works }) => {
  const router = useRouter();
  const currentWork = works?.find(
    (x) => x?.attributes?.slug == router?.query?.slug
  );
  const currentImage = currentWork?.attributes?.image;
  const {
    createdAt,
    description,
    publishedAt,
    updatedAt,
    ...currentDescription
  } = currentWork?.attributes?.workDescription?.data?.attributes;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [blur, setBlur] = useState({ default: 10, current: 10 });

  const handleClickNextWork = () => {
    const nextIndex = Number(router?.query?.slug) + 1;
    works?.find((y) => y?.id == nextIndex)
      ? router?.push(`${nextIndex}`)
      : router?.push(`1`);
  };

  const handleClickPreviousWork = () => {
    const prevIndex = Number(router?.query?.slug) - 1;
    works?.find((y) => y?.id == prevIndex)
      ? router?.push(`${prevIndex}`)
      : router?.push(`${works?.length}`);
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

  const scrollableRef = useCallback((node: HTMLDivElement) => {
    if (node !== null && node?.clientHeight === node?.scrollHeight) {
      setBlur((blur) => ({ ...blur, current: 0 }));
    }
  }, []);

  return (
    <Layout
      sidebarProps={{
        children: (
          <NavButton
            onClick={handleClickPreviousWork}
            className="hidden mx-auto lg:block hover:opacity-60 "
          >
            <path
              d="M10.3409 21L12.0909 19.25L4.88636 12.0682H23.5455V9.56818H4.88636L12.0909 2.36364L10.3409 0.636364L0.159091 10.8182L10.3409 21Z"
              fill="black"
            />
          </NavButton>
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
        tabIndex: -1,
      }}
    >
      {/* Nav mobile */}
      <div className="flex justify-between w-screen sticky border-b border-yellow-500 h-12 px-4 md:px-5 md:h-16 lg:hidden">
        <NavButton
          onClick={handleClickPreviousWork}
          className="active:opacity-60"
        >
          <path
            d="M10.3409 21L12.0909 19.25L4.88636 12.0682H23.5455V9.56818H4.88636L12.0909 2.36364L10.3409 0.636364L0.159091 10.8182L10.3409 21Z"
            fill="black"
          />
        </NavButton>
        <NavButton onClick={handleClickNextWork} className="active:opacity-60">
          <path
            d="M13.2045 21L23.3864 10.8182L13.2045 0.636364L11.4545 2.38636L18.6591 9.56818H0V12.0682H18.6591L11.4545 19.2727L13.2045 21Z"
            fill="black"
          />
        </NavButton>
      </div>
      <div
        onScroll={handleOnScroll}
        ref={scrollableRef}
        className="w-screen h-full px-4 pt-3 pb-4 overflow-scroll flex flex-col gap-8 md:pt-12 lg:pt-20 lg:px-6 lg:border-r lg:border-yellow-500 lg:w-[42vw] 2xl:px-8 2xl:pt-28"
      >
        <p className="text-lg md:text-2xl lg:text-xl xl:text-2xl">
          Moderated usability testing with eye-tracker
        </p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 md:gap-x-28 lg:gap-x-16 xl:gap-x-32">
          {Object.entries(currentDescription).map(([key, value]) => (
            <React.Fragment key={key}>
              <div className="text-base">{key}</div>
              <div className="text-xs md:text-lg">{value}</div>
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs md:text-lg">{description}</p>
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
          />
        </button>
      </div>
      <div className="absolute top-[44%] right-[-46px] border-2 hover:border-4 rounded-full hover:opacity-60 border-[#F9B78B] hover:border-[rgb(249,183,139,0.6)] hidden lg:block">
        <NavButton
          onClick={handleClickNextWork}
          className="m-10 relative right-5"
        >
          <path
            d="M13.2045 21L23.3864 10.8182L13.2045 0.636364L11.4545 2.38636L18.6591 9.56818H0V12.0682H18.6591L11.4545 19.2727L13.2045 21Z"
            fill="black"
          />
        </NavButton>
      </div>
      <WorkModal
        isVisible={isModalVisible}
        onBackButtonClick={() => setIsModalVisible(!isModalVisible)}
        ImageComponent={() => (
          <div className="relative w-[90%] h-[48%] md:h-[77%]">
            <NextImage image={currentImage} />
          </div>
        )}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [categoriesRes, worksRes] = await Promise.all([
    fetchAPI('/categories', { populate: '*' }),
    //TODO: Call request for the current work not for all works
    fetchAPI('/works', { populate: '*' }),
  ]);
  return {
    props: {
      categories: categoriesRes.data,
      works: worksRes.data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await fetchAPI('/works');

  const paths = data.map((w) => ({
    params: { slug: `${w?.attributes?.slug}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Work;
