import { GetStaticProps } from 'next';
import Layout from '../../components/layout';
import { fetchAPI } from '../../lib/api';
import Link from 'next/link';
import { useState } from 'react';

type TextType = {
  typeName: 'all' | 'curation' | 'design' | 'research';
  color: 'bg-pink-400' | 'red' | 'bg-green-300';
};

type Text = {
  type: TextType;
  name: string;
  url: string;
};
const TEXT_TYPES: TextType[] = [
  { typeName: 'all', color: 'red' },
  { typeName: 'curation', color: 'red' },
  { typeName: 'design', color: 'red' },
  { typeName: 'research', color: 'bg-pink-400' },
];
const textS: Text[] = [
  {
    type: { typeName: 'research', color: 'bg-pink-400' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/texts/1',
  },
  {
    type: { typeName: 'research', color: 'bg-pink-400' },
    name: 'Moderated non-laboratory usability testing of the ATMs →',
    url: '/texts/2',
  },
  {
    type: { typeName: 'research', color: 'bg-pink-400' },
    name: 'Moderated non-laboratory usability testing of the ATMs →',
    url: '/texts/3',
  },
  {
    type: { typeName: 'design', color: 'bg-green-300' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/texts/1',
  },
  {
    type: { typeName: 'design', color: 'bg-green-300' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/texts/1',
  },
  {
    type: { typeName: 'design', color: 'bg-green-300' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/texts/1',
  },
  {
    type: { typeName: 'design', color: 'bg-green-300' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/texts/1',
  },
  {
    type: { typeName: 'design', color: 'bg-green-300' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/texts/1',
  },
  {
    type: { typeName: 'design', color: 'bg-green-300' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/texts/1',
  },
  {
    type: { typeName: 'design', color: 'bg-green-300' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/texts/1',
  },
  {
    type: { typeName: 'design', color: 'bg-green-300' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/texts/1',
  },
  {
    type: { typeName: 'design', color: 'bg-green-300' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/texts/1',
  },
];

const Texts = ({ categories }) => {
  const [textCategory, setTextCategory] = useState<string>('all');

  return (
    <Layout>
      {/* Inline navigation */}
      {/*   */}
      <div className="shrink-0 border-yellow-500 border-b lg:border-b-0 lg:border-r lg:w-[42vw] lg:py-28">
        <ul className="flex text-sm gap-9 w-screen overflow-scroll px-4 md:text-xl md:gap-16 lg:gap-5 lg:w-auto lg:flex-col xl:text-2xl xl:px-6">
          {TEXT_TYPES?.map((type) => (
            <li key={type.typeName}>
              <button
                value={type.typeName}
                onClick={(e) => setTextCategory(e?.currentTarget?.value)}
                className={`hover:opacity-20 visited:line-through ${
                  textCategory === type.typeName ? 'line-through' : null
                }`}
              >
                {type.typeName}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Table */}
      <div className="grid overflow-scroll md:grid-cols-2 lg:grid-cols-none lg:grid-rows-2 lg:grid-flow-col lg:w-[54vw] lg:auto-cols-[100%] xl:auto-cols-[50%] 2xl:auto-cols-[33%]">
        {textS.map((text, i) => (
          <div
            key={text?.name}
            //   i % 2 === 0 ? 'border-b' : ''
            className={`border-yellow-500 border-r px-8 py-12 flex flex-col gap-8 relative border-b`}
          >
            <div
              className={`${text?.type?.color} blur-xl h-6 w-24 absolute`}
            ></div>
            <span className="text-base z-10">{text?.type?.typeName}</span>
            <Link href={text?.url}>
              <a className="hover:opacity-20 text-lg">
                <p>{text?.name}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
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

export default Texts;
