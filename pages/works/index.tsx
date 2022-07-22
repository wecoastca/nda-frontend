import { GetStaticProps } from 'next';
import Layout from '../../components/layout';
import { fetchAPI } from '../../lib/api';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Works = ({ categories, works }) => {
  const router = useRouter();
  const { c } = router?.query;
  const [workCategory, setWorkCategory] = useState<string>(
    (c as string) || 'all'
  );

  return (
    <Layout>
      <div className="shrink-0 border-[#FA6400] border-b lg:border-b-0 lg:border-r lg:w-[42vw] lg:py-28">
        <ul className="flex text-sm gap-9 w-screen overflow-scroll px-4 md:text-xl md:gap-16 lg:gap-5 lg:w-auto lg:flex-col xl:text-2xl xl:px-6">
          <li>
            <button
              value={'all'}
              onClick={(e) => setWorkCategory(e?.currentTarget?.value)}
              className={`hover:opacity-20 visited:line-through ${
                workCategory === 'all' ? 'line-through' : null
              }`}
            >
              all
            </button>
          </li>
          {categories?.map((item) => (
            <li key={item.id}>
              <button
                value={item?.attributes.name}
                onClick={(e) => setWorkCategory(e?.currentTarget?.value)}
                className={`hover:opacity-20 visited:line-through w-max ${
                  workCategory === item.attributes?.name ? 'line-through' : null
                } `}
              >
                {item?.attributes?.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid overflow-x-scroll md:grid-cols-2 lg:grid-cols-none lg:grid-rows-2 lg:grid-flow-col lg:w-[54vw] lg:auto-cols-[100%] xl:auto-cols-[50%] 2xl:auto-cols-[33%]">
        {works
          .filter(
            (x) =>
              !!x?.attributes?.categories?.data?.find(
                (z) => z?.attributes?.name === workCategory
              ) || workCategory === 'all'
          )
          .map((work) => {
            return (
              <div
                key={work?.id}
                className={`border-[#FA6400] border-b border-r hover:border-[#FD6703] hover:border-2 hover:border-t-[1px]md:border-r  lg:even:border-b-0 lg:even:hover:border-b lg:even:hover:border-l lg:even:hover:border-t lg:odd:hover:border-l lg:odd:hover:border-t px-8 py-12 flex flex-col gap-8 work-block `}
              >
                <div className="relative w-min flex gap-5">
                  {work?.attributes?.categories?.data?.map((c) => (
                    <div key={c?.id} className="w-max">
                      <div
                        className={`blur-md h-8 absolute -z-10`}
                        id="blurCircle"
                        style={{
                          background: c?.attributes?.color,
                          width: c?.attributes?.name.length * 12,
                        }}
                      ></div>
                      <button
                        value={c?.attributes?.name}
                        onClick={(e) =>
                          setWorkCategory(e?.currentTarget?.value)
                        }
                        className={`hover:opacity-20 visited:line-through inline-block`}
                      >
                        <span className="text-base z-10">
                          {c?.attributes?.name}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/works/${encodeURIComponent(work?.attributes?.slug)}`}
                >
                  <a>
                    <p className="hover:opacity-20 text-lg">
                      {work?.attributes?.title}
                    </p>
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [{ data: categories }, { data: works }] = await Promise.all([
    fetchAPI('/categories', { populate: '*' }),
    fetchAPI('/works', { populate: '*' }),
  ]);

  return {
    props: {
      categories,
      works,
    },
    revalidate: 10,
  };
};

export default Works;
