import { GetStaticPaths, GetStaticProps } from 'next';
import Card from '../../components/card';
import Layout from '../../components/layout';
import Link from 'next/link';
import { fetchAPI } from '../../lib/api';

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
        id: 4,
        attributes: {
          name: 'what-s-inside-a-black-hole',
          alternativeText: 'what-s-inside-a-black-hole',
          caption: 'what-s-inside-a-black-hole',
          width: 800,
          height: 466,
          formats: {
            thumbnail: {
              name: 'thumbnail_what-s-inside-a-black-hole',
              hash: 'thumbnail_what_s_inside_a_black_hole_66bd76c4da',
              ext: '.jpg',
              mime: 'image/jpeg',
              width: 245,
              height: 143,
              size: 1.74,
              path: null,
              url: '/uploads/thumbnail_what_s_inside_a_black_hole_66bd76c4da.jpg',
            },
            medium: {
              name: 'medium_what-s-inside-a-black-hole',
              hash: 'medium_what_s_inside_a_black_hole_66bd76c4da',
              ext: '.jpg',
              mime: 'image/jpeg',
              width: 750,
              height: 437,
              size: 7.13,
              path: null,
              url: '/uploads/medium_what_s_inside_a_black_hole_66bd76c4da.jpg',
            },
            small: {
              name: 'small_what-s-inside-a-black-hole',
              hash: 'small_what_s_inside_a_black_hole_66bd76c4da',
              ext: '.jpg',
              mime: 'image/jpeg',
              width: 500,
              height: 291,
              size: 4.08,
              path: null,
              url: '/uploads/small_what_s_inside_a_black_hole_66bd76c4da.jpg',
            },
          },
          hash: 'what_s_inside_a_black_hole_66bd76c4da',
          ext: '.jpg',
          mime: 'image/jpeg',
          size: 7.5,
          url: '/uploads/what_s_inside_a_black_hole_66bd76c4da.jpg',
          previewUrl: null,
          provider: 'local',
          provider_metadata: null,
          createdAt: '2022-01-21T16:57:26.684Z',
          updatedAt: '2022-01-21T16:57:26.684Z',
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

const Text = () => {
  return (
    <Layout>
      <div className="border-r border-yellow-500 h-full w-5/12 flex flex-col  justify-evenly px-8 shrink-0">
        <p className="text-5xl">Moderated usability testing with eye-tracker</p>
        <div className="grid grid-cols-2 gap-x-16 gap-y-10">
          {Object.entries(FIELDS).map(([key, value]) => (
            <>
              <div className="text-2xl">{key}</div>
              <div className="text-3xl">{value}</div>
            </>
          ))}
        </div>
        <p className="text-3xl">
          Lorem Ipsuidopd djdjjdj uddu udjduud3 Lorem Ipsuidopd djdjjdj uddu
          udjduud3
        </p>
      </div>
      <div className="h-full p-10 flex items-center border-r border-yellow-500">
        <Card cardData={OBJ} />
      </div>
      <div className="border-r border-yellow-500 h-full w-5/12 flex flex-col  justify-evenly px-8 shrink-0">
        <p className="text-5xl">Moderated usability testing with eye-tracker</p>
        <div className="grid grid-cols-2 gap-x-16 gap-y-10">
          {Object.entries(FIELDS).map(([key, value]) => (
            <>
              <div className="text-2xl">{key}</div>
              <div className="text-3xl">{value}</div>
            </>
          ))}
        </div>
        <p className="text-3xl">
          Lorem Ipsuidopd djdjjdj uddu udjduud3 Lorem Ipsuidopd djdjjdj uddu
          udjduud3
        </p>
      </div>
      <div className="absolute border-2 border-yellow-500 w-36 h-36 rounded-full top-1/2 -right-16 flex items-center p-10">
        <Link href={'/texts/2'}>
          <a className="text-3xl">→</a>
        </Link>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return null;
};

// TODO: Измени на то, что будет приходить с бека список работ.
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await fetchAPI('/articles');
  const paths = data.map((w) => ({ params: { slug: `${w?.id}` } }));

  return {
    paths,
    fallback: false,
  };
};

export default Text;
