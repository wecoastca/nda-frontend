import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/layout';
import { fetchAPI } from '../lib/api';
import Card from '../components/card';

const Home = ({
  categories,
  homepage,
  articles,
}: {
  articles: any;
  categories: any;
  homepage: any;
}) => {
  // TODO: Левый и правый блок вынести в отдельные компоненты

  return (
    <Layout categories={categories}>
      {/* Text block */}
      <div className="flex flex-col px-4 justify-around w-screen gap-5 pt-4 md:pt-8 md:gap-10 lg:gap-0 lg:px-5 lg:border-r lg:border-yellow-500 lg:w-[42vw]">
        <p className="text-base md:text-xl xl:text-2xl">
          All works are blured until we dive into the process and restrictions.
        </p>
        <div className="md:text-base">
          With hover you could pry about the final decisions but don’t have a
          clue why they was made.
        </div>
      </div>

      {/* Cards */}
      <div className="mx-4 flex gap-10 items-center overflow-scroll w-screen pb-4 md:pb-8 lg:w-[54vw] lg:mx-10">
        {articles?.map((x, i) => (
          <Card
            cardData={x}
            key={i}
            className="opacity-20 w-[252px] h-[533px] md:w-[403px] md:h-[533px] xl:w-[520px] xl:h-[632px] shrink-0 relative"
          />
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI('/articles', { populate: '*' }),
    fetchAPI('/categories', { populate: '*' }),
    fetchAPI('/homepage', {
      populate: {
        hero: '*',
        seo: { populate: '*' },
      },
    }),
  ]);

  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  };
};

export default Home;
