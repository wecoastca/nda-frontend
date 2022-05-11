import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../../components/layout';
import { fetchAPI } from '../../lib/api';

const About = ({ about }) => {
  return (
    <Layout>
      <div className="w-screen border-[#FA6400] border-b pt-4 px-4 pb-10 md:py-16 lg:py-20 lg:px-6 lg:border-r lg:border-b-0 lg:w-[42vw] 2xl:py-28 2xl:px-8">
        <p className="text-lg mb-10 md:mb-8 lg:mb-24 md:text-xl xl:text-2xl">
          {about?.[0]?.attributes?.title}
        </p>
        <p className="text-xs md:text-lg">
          {about?.[0]?.attributes?.description}
        </p>
      </div>
      <div className="w-screen h-full lg:w-[54vw] pt-4 px-4 pb-10 md:py-16 lg:py-20 2xl:py-28 2xl:px-8">
        <p className="text-lg mb-10 md:mb-8 lg:mb-24 md:text-xl xl:text-2xl">
          {about?.[1]?.attributes?.title}
        </p>
        <p className="text-xs md:text-lg">
          {about?.[1]?.attributes?.description}
        </p>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const aboutRes = await fetchAPI('/about');

  return {
    props: {
      about: aboutRes.data,
    },
    revalidate: 10,
  };
};

export default About;
