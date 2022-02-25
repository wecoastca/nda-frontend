import { GetStaticPaths, GetStaticProps } from 'next';
import Card from '../../components/card';
import Layout from '../../components/layout';
import Link from 'next/link';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import {
  ButtonHTMLAttributes,
  FC,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import NextImage from '../../components/image';

const FIELDS = {
  period: '2018',
  duration: '1 month',
  customer: 'SBER',
  'project position': 'UX-researher',
  tools: 'Tobii Studio OBS',
};

const OBJ = {
  id: 1,
  attributes: {
    title: "What's inside a Black Hole",
    description: 'Maybe the answer is in this article, or not...',
    content: "Well, we don't know yet...",
    slug: 'what-s-inside-a-black-hole',
    createdAt: '2022-01-21T16:57:26.701Z',
    updatedAt: '2022-01-21T16:57:26.701Z',
    publishedAt: '2022-01-21T16:57:26.388Z',
    category: {
      data: null,
    },
    image: {
      data: {
        id: 5,
        attributes: {
          name: 'the-internet-s-own-boy',
          alternativeText: 'the-internet-s-own-boy',
          caption: 'the-internet-s-own-boy',
          width: 1200,
          height: 707,
          formats: {
            thumbnail: {
              name: 'thumbnail_the-internet-s-own-boy',
              hash: 'thumbnail_the_internet_s_own_boy_6a65fa4c52',
              ext: '.jpg',
              mime: 'image/jpeg',
              width: 245,
              height: 144,
              size: 8.37,
              path: null,
              url: '/uploads/thumbnail_the_internet_s_own_boy_6a65fa4c52.jpg',
            },
            large: {
              name: 'large_the-internet-s-own-boy',
              hash: 'large_the_internet_s_own_boy_6a65fa4c52',
              ext: '.jpg',
              mime: 'image/jpeg',
              width: 1000,
              height: 589,
              size: 70.3,
              path: null,
              url: '/uploads/large_the_internet_s_own_boy_6a65fa4c52.jpg',
            },
            medium: {
              name: 'medium_the-internet-s-own-boy',
              hash: 'medium_the_internet_s_own_boy_6a65fa4c52',
              ext: '.jpg',
              mime: 'image/jpeg',
              width: 750,
              height: 442,
              size: 46.12,
              path: null,
              url: '/uploads/medium_the_internet_s_own_boy_6a65fa4c52.jpg',
            },
            small: {
              name: 'small_the-internet-s-own-boy',
              hash: 'small_the_internet_s_own_boy_6a65fa4c52',
              ext: '.jpg',
              mime: 'image/jpeg',
              width: 500,
              height: 295,
              size: 24.99,
              path: null,
              url: '/uploads/small_the_internet_s_own_boy_6a65fa4c52.jpg',
            },
          },
          hash: 'the_internet_s_own_boy_6a65fa4c52',
          ext: '.jpg',
          mime: 'image/jpeg',
          size: 91.55,
          url: '/uploads/the_internet_s_own_boy_6a65fa4c52.jpg',
          previewUrl: null,
          provider: 'local',
          provider_metadata: null,
          createdAt: '2022-02-17T13:09:17.191Z',
          updatedAt: '2022-02-17T13:09:17.191Z',
        },
      },
    },
    author: {
      data: {
        id: 2,
        attributes: {
          name: 'Sarah Baker',
          email: 'sarahbaker@strapi.io',
          createdAt: '2022-01-21T16:57:26.384Z',
          updatedAt: '2022-01-21T16:57:26.384Z',
        },
      },
    },
  },
};

const BackButton: FC<ButtonHTMLAttributes<any>> = ({
  onClick,
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
        <path
          d="M10.3409 21L12.0909 19.25L4.88636 12.0682H23.5455V9.56818H4.88636L12.0909 2.36364L10.3409 0.636364L0.159091 10.8182L10.3409 21Z"
          fill="black"
        />
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
    <div className="w-full h-full fixed z-10 bg-white top-0 flex flex-col lg:hidden">
      <div className="border-b border-yellow-500 h-12 px-4 md:px-5 md:h-16 flex">
        <BackButton onClick={onBackButtonClick && onBackButtonClick} />
      </div>
      <div className="flex justify-center items-center h-full">
        <ImageComponent />
      </div>
    </div>
  );
};

const Work = ({ categories }) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleClickNextWork = (e) => {
    router?.push(`${Number(router?.query?.slug) + 1}`);
  };

  const handleClickPreviousWork = (e) => {
    router?.push(`${Number(router?.query?.slug) - 1}`);
  };

  const handleCardClick = () => {
    console.log(1);
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Layout
      categories={categories}
      sidebarProps={{
        children: (
          <BackButton
            onClick={handleClickPreviousWork}
            className="hidden mx-auto lg:block "
          />
        ),
      }}
    >
      {/* Nav mobile */}
      <div className="flex justify-between w-screen sticky border-b border-yellow-500 h-12 px-4 md:px-5 md:h-16 lg:hidden">
        <button onClick={handleClickPreviousWork}>
          <svg
            width="24"
            height="21"
            viewBox="0 0 24 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3409 21L12.0909 19.25L4.88636 12.0682H23.5455V9.56818H4.88636L12.0909 2.36364L10.3409 0.636364L0.159091 10.8182L10.3409 21Z"
              fill="black"
            />
          </svg>
        </button>
        <button onClick={handleClickNextWork}>
          <svg
            width="24"
            height="21"
            viewBox="0 0 24 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2045 21L23.3864 10.8182L13.2045 0.636364L11.4545 2.38636L18.6591 9.56818H0V12.0682H18.6591L11.4545 19.2727L13.2045 21Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      {/* <div className="border-r border-yellow-500 h-full w-5/12 flex flex-col  justify-evenly px-8 shrink-0"> */}
      <div className="w-screen h-full px-4 pt-3 pb-4 overflow-scroll flex flex-col gap-8 md:pt-12 lg:pt-20 lg:px-6 lg:border-r lg:border-yellow-500 lg:w-[42vw] 2xl:px-8 2xl:pt-28">
        <p className="text-lg md:text-2xl lg:text-xl xl:text-2xl">
          Moderated usability testing with eye-tracker
        </p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 md:gap-x-28 lg:gap-x-16 xl:gap-x-32">
          {Object.entries(FIELDS).map(([key, value]) => (
            <>
              <div className="text-base">{key}</div>
              <div className="text-xs md:text-lg">{value}</div>
            </>
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
          className="w-[139px] h-[184px] absolute right-4 bottom-14 md:w-[233px] md:h-[309px] md:right-11 md:bottom-24 lg:relative lg:right-auto lg:bottom-auto lg:w-[75%] lg:h-[78%] lg:cursor-default"
        >
          <NextImage image={OBJ.attributes.image} id="workImage" />
        </button>
      </div>

      <WorkModal
        isVisible={isModalVisible}
        onBackButtonClick={() => setIsModalVisible(!isModalVisible)}
        ImageComponent={() => (
          <div className="relative w-[90%] h-[48%] md:h-[77%]">
            <NextImage image={OBJ.attributes.image} />
          </div>
        )}
      />

      {/* Other work */}
      {/* <div className="border-r border-yellow-500 h-full w-5/12 flex flex-col  justify-evenly px-8 shrink-0">
        <p className="text-lg md:text-2xl lg:text-xl xl:text-2xl">
          Moderated usability testing with eye-tracker
        </p>
        <div className="grid grid-cols-2 gap-x-16 gap-y-10">
          {Object.entries(FIELDS).map(([key, value]) => (
            <>
              <div className="text-base">{key}</div>
              <div className="text-xs md:text-lg">{value}</div>
            </>
          ))}
        </div>
        <p className="text-xs md:text-lg">
          Lorem Ipsuidopd djdjjdj uddu udjduud3 Lorem Ipsuidopd djdjjdj uddu
          udjduud3
        </p>
      </div>
      <div className="absolute border-2 border-yellow-500 w-36 h-36 rounded-full top-1/2 -right-16 flex items-center p-10">
        <Link href={'/works/2'}>
          <a className="text-3xl">→</a>
        </Link>
      </div> */}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [categoriesRes] = await Promise.all([
    fetchAPI('/categories', { populate: '*' }),
  ]);

  return {
    props: {
      categories: categoriesRes.data,
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
