import { GetStaticProps } from 'next';
import Layout from '../../components/layout';
import { fetchAPI } from '../../lib/api';
import Link from 'next/link';
import { useState } from 'react';

type WorkType = {
  typeName: 'all' | 'curation' | 'design' | 'research';
  color: string;
};

type Work = {
  type: WorkType;
  name: string;
  url: string;
};
const WORK_TYPES: WorkType[] = [
  { typeName: 'all', color: 'red' },
  { typeName: 'curation', color: 'red' },
  { typeName: 'design', color: 'red' },
  { typeName: 'research', color: 'bg-pink-400' },
];
const WORKS: Work[] = [
  {
    type: { typeName: 'research', color: 'bg-[#FF6AC6]' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/works/1',
  },
  {
    type: { typeName: 'research', color: 'bg-[#FF6AC6]' },
    name: 'Moderated non-laboratory usability testing of the ATMs →',
    url: '/works/2',
  },
  {
    type: { typeName: 'research', color: 'bg-[#FF6AC6]' },
    name: 'Moderated non-laboratory usability testing of the ATMs →',
    url: '/works/3',
  },
  {
    type: { typeName: 'design', color: 'bg-[#02FA00]' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/works/1',
  },
  {
    type: { typeName: 'design', color: 'bg-[#02FA00]' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/works/1',
  },
  {
    type: { typeName: 'design', color: 'bg-[#02FA00]' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/works/1',
  },
  {
    type: { typeName: 'design', color: 'bg-[#02FA00]' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/works/1',
  },
  {
    type: { typeName: 'design', color: 'bg-[#02FA00]' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/works/1',
  },
  {
    type: { typeName: 'design', color: 'bg-[#02FA00]' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/works/1',
  },
  {
    type: { typeName: 'design', color: 'bg-[#02FA00]' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/works/1',
  },
  {
    type: { typeName: 'design', color: 'bg-[#02FA00]' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/works/1',
  },
  {
    type: { typeName: 'design', color: 'bg-[#02FA00]' },
    name: 'Moderated usability testing with eye-tracker →',
    url: '/works/1',
  },
];

const Works = ({ categories }) => {
  const [workCategory, setWorkCategory] = useState<string>('all');

  return (
    <Layout categories={categories}>
      {/* Inline navigation */}
      {/*   */}
      <div className="shrink-0 border-yellow-500 border-b lg:border-b-0 lg:border-r lg:w-[42vw] lg:py-28">
        <ul className="flex text-sm gap-9 w-screen overflow-scroll px-4 md:text-xl md:gap-16 lg:gap-5 lg:w-auto lg:flex-col xl:text-2xl xl:px-6">
          {WORK_TYPES?.map((type) => (
            <li key={type.typeName}>
              <button
                value={type.typeName}
                onClick={(e) => setWorkCategory(e?.currentTarget?.value)}
                className={`hover:opacity-20 visited:line-through ${
                  workCategory === type.typeName ? 'line-through' : null
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
        {WORKS.map((work, i) => (
          <div
            key={work?.name}
            //   i % 2 === 0 ? 'border-b' : ''
            className={`border-yellow-500 border-r px-8 py-12 flex flex-col gap-8 border-b`}
          >
            <div className="relative w-min">
              <div
                className={`${work?.type?.color} blur-md h-8 w-full absolute -z-10`}
              ></div>
              <button
                value={work?.type?.typeName}
                onClick={(e) => setWorkCategory(e?.currentTarget?.value)}
                className={`hover:opacity-20 visited:line-through inline-block ${
                  workCategory === work?.type?.typeName ? 'line-through' : null
                }`}
              >
                <span className="text-base z-10">{work?.type?.typeName}</span>
              </button>
            </div>
            <Link href={work?.url}>
              <a className="hover:opacity-20 text-lg">
                <p>{work?.name}</p>
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

export default Works;
