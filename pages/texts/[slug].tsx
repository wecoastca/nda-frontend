import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import NextImage from '../../components/image';
import React from 'react';
import { marked } from 'marked';
import { NavButton } from '../../components/navButton';

const Text = ({ texts }) => {
  const router = useRouter();
  const currentText = texts?.find(
    (x) => x?.attributes?.slug == router?.query?.slug
  );
  const { title, image, content, categories, slug } = currentText?.attributes;
  const currIndex = texts.findIndex((w) => w.attributes.slug === slug);

  const markedHtml = marked.parse(content || '');

  const handleClickNextWork = () => {
    const nextTextSlug =
      currIndex + 1 === texts.length
        ? texts[0].attributes.slug
        : texts[currIndex + 1].attributes.slug;

    router?.push(`${nextTextSlug}`);
  };

  const handleClickPreviousWork = () => {
    const prevTextSlug =
      currIndex === 0
        ? texts[texts.length - 1].attributes.slug
        : texts[currIndex - 1].attributes.slug;
    router?.push(`${prevTextSlug}`);
  };

  return (
    <Layout
      sidebarProps={{
        children: (
          <NavButton
            onClick={handleClickPreviousWork}
            direction="left"
            className="hidden mx-auto lg:block hover:opacity-60"
          />
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
      <div className="flex justify-between w-screen sticky border-b border-[#FA6400] h-12 px-4 md:px-5 md:h-16 lg:hidden">
        <NavButton
          onClick={handleClickPreviousWork}
          direction="left"
          className="active:opacity-60"
        />
        <NavButton
          onClick={handleClickNextWork}
          direction="right"
          className="active:opacity-60"
        />
      </div>
      <div className="w-screen h-full px-4 pt-6 pb-4 overflow-scroll flex flex-col gap-8 md:pt-12 lg:pt-20 lg:px-6 lg:border-r lg:border-[#FA6400] lg:w-[42vw] 2xl:px-8 2xl:pt-28">
        <div className="relative w-min flex gap-5">
          {categories?.data.map((c) => (
            <div key={c?.id}>
              <div
                className={`blur-md h-8 absolute -z-10`}
                style={{
                  background: c?.attributes?.color,
                  width: c?.attributes?.name.length * 12,
                }}
              ></div>
              <div className={`inline-block`}>
                <span className="text-base z-10">{c?.attributes?.name}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-lg md:text-2xl lg:text-xl xl:text-2xl">{title}</p>
        <div
          className="text-xs md:text-lg"
          dangerouslySetInnerHTML={{
            __html: markedHtml,
          }}
        />
      </div>

      <div className="lg:h-full lg:w-[54vw] lg:flex lg:items-center lg:justify-center">
        <NextImage image={image} alt={image?.data.attributes.alternativeText} />
      </div>
      <div className="absolute top-[44%] right-[-46px] border-2 hover:border-4 rounded-full hover:opacity-60 border-[#F9B78B] hover:border-[rgb(249,183,139,0.6)] hidden lg:block">
        <NavButton
          onClick={handleClickNextWork}
          direction="right"
          className="m-10 relative right-5"
        />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [{ data: categories }, { data: texts }] = await Promise.all([
    fetchAPI('/text-categories', { populate: '*' }),
    fetchAPI('/texts', { populate: '*' }),
  ]);
  return {
    props: {
      categories: categories,
      texts: texts,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await fetchAPI('/texts');

  const paths = data.map((t) => ({
    params: { slug: `${t?.attributes?.slug}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Text;
