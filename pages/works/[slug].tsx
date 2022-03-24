import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import React, { ButtonHTMLAttributes, FC, useState } from 'react';
import NextImage from '../../components/image';

const FIELDS = {
  period: '2018',
  duration: '1 month',
  customer: 'SBER',
  'project position': 'UX-researher',
  tools: 'Tobii Studio OBS',
};

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

const Work = ({ categories, articles }) => {
  const router = useRouter();
  // TODO: Как сделаешь нормальную структуру данных, сделай чтобы в одном обьекте Work хранилась вся информация о работа + картинка
  const currentWork = articles?.find((x) => x?.id == router?.query?.slug);
  const currentImage = currentWork?.attributes?.image;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleClickNextWork = () => {
    const nextIndex = Number(router?.query?.slug) + 1;
    articles?.find((y) => y?.id == nextIndex)
      ? router?.push(`${nextIndex}`)
      : router?.push(`1`);
  };

  const handleClickPreviousWork = () => {
    const prevIndex = Number(router?.query?.slug) - 1;
    articles?.find((y) => y?.id == prevIndex)
      ? router?.push(`${prevIndex}`)
      : router?.push(`${articles?.length}`);
  };

  const handleCardClick = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Layout
      categories={categories}
      sidebarProps={{
        children: (
          <NavButton
            onClick={handleClickPreviousWork}
            className="hidden mx-auto lg:block "
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
        <NavButton onClick={handleClickPreviousWork}>
          <path
            d="M10.3409 21L12.0909 19.25L4.88636 12.0682H23.5455V9.56818H4.88636L12.0909 2.36364L10.3409 0.636364L0.159091 10.8182L10.3409 21Z"
            fill="black"
          />
        </NavButton>
        <NavButton onClick={handleClickNextWork}>
          <path
            d="M13.2045 21L23.3864 10.8182L13.2045 0.636364L11.4545 2.38636L18.6591 9.56818H0V12.0682H18.6591L11.4545 19.2727L13.2045 21Z"
            fill="black"
          />
        </NavButton>
      </div>
      <div className="w-screen h-full px-4 pt-3 pb-4 overflow-scroll flex flex-col gap-8 md:pt-12 lg:pt-20 lg:px-6 lg:border-r lg:border-yellow-500 lg:w-[42vw] 2xl:px-8 2xl:pt-28">
        <p className="text-lg md:text-2xl lg:text-xl xl:text-2xl">
          Moderated usability testing with eye-tracker
        </p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 md:gap-x-28 lg:gap-x-16 xl:gap-x-32">
          {Object.entries(FIELDS).map(([key, value]) => (
            <React.Fragment key={key}>
              <div className="text-base">{key}</div>
              <div className="text-xs md:text-lg">{value}</div>
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs md:text-lg">
          Lorem Ipsuidopd djdjjdj uddu udjduud3 Lorem Ipsuidopd djdjjdj uddu
          udjduud3
        </p>
      </div>

      <div className="lg:h-full lg:w-[54vw] lg:flex lg:items-center lg:justify-center">
        <button
          onClick={handleCardClick}
          className="w-[139px] h-[184px] absolute right-4 bottom-14 md:w-[233px] md:h-[309px] md:right-11 md:bottom-24 lg:relative lg:right-auto lg:bottom-auto lg:w-[75%] lg:h-[78%] lg:cursor-default lg:pointer-events-none"
        >
          <NextImage image={currentImage} id="workImage" />
        </button>
      </div>
      <div className="absolute top-[44%] right-[-46px] border-4 rounded-full border-[rgb(249,183,139,0.6)] hidden lg:block">
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
  const [categoriesRes, articlesRes] = await Promise.all([
    fetchAPI('/categories', { populate: '*' }),
    fetchAPI('/articles', { populate: ['image'] }),
  ]);

  return {
    props: {
      categories: categoriesRes.data,
      articles: articlesRes.data,
    },
  };
};

// TODO: Измени на то, что будет приходить с бека список работ.
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: '1',
        },
      },
      { params: { slug: '2' } },
      { params: { slug: '3' } },
      { params: { slug: '4' } },
      { params: { slug: '5' } },
      { params: { slug: '6' } },
      { params: { slug: '7' } },
      { params: { slug: '8' } },
    ],
    fallback: false,
  };
};

export default Work;
