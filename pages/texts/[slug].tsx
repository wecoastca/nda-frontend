import { GetStaticPaths, GetStaticProps } from 'next';
import { SwitchingLayout, Image } from '../../components';
import { fetchAPI } from '../../lib/api';
import { useRouter } from 'next/router';
import React from 'react';
import { marked } from 'marked';

const Text = ({ text, slugs }) => {
  const router = useRouter();

  const { title, image, content, categories, slug } = text.attributes;

  const currSlugI = slugs.indexOf(slug);
  const nextSlug = slugs[(currSlugI + 1) % slugs.length];
  const prevSlug = slugs[currSlugI - 1 < 0 ? slugs.length - 1 : currSlugI - 1];

  const markedHtml = marked.parse(content || '');

  const handleClickNextText = () => {
    router?.push(`${nextSlug}`);
  };

  const handleClickPreviousText = () => {
    router?.push(`${prevSlug}`);
  };

  return (
    <SwitchingLayout
      onNext={handleClickNextText}
      onPrevious={handleClickPreviousText}
      layoutContainerProps={{
        tabIndex: -1,
      }}
    >
      <div className="w-screen h-full px-4 pt-6 pb-4 overflow-scroll flex flex-col gap-8 lg:px-6 lg:border-r lg:border-[#FA6400] lg:w-[42vw] 2xl:px-8 2xl:pt-12">
        <div
          className="relative flex-wrap whitespace-nowrap flex gap-5"
          style={categories.data.length === 0 ? { display: 'none' } : {}}
        >
          {categories?.data.map((c) => {
            const { color, name } = c.attributes;
            return (
              <div key={c?.id}>
                <div
                  className={`blur-md h-8 absolute -z-10`}
                  style={{
                    background: color,
                    width: name.length * 12,
                  }}
                ></div>
                <button
                  className={`inline-block hover:opacity-20`}
                  value={name}
                  onClick={(e) => {
                    router.push(`/texts?c=${e.currentTarget?.value}`);
                  }}
                >
                  <span className="text-base z-10">{name}</span>
                </button>
              </div>
            );
          })}
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
        <div className="hidden lg:block lg:relative lg:right-auto lg:bottom-auto lg:w-[75%] lg:h-[78%] lg:cursor-default">
          <Image image={image} alt={image?.data.attributes.alternativeText} />
        </div>
      </div>
    </SwitchingLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const { data: texts } = await fetchAPI('/texts', { populate: '*' });

  const text = texts.find((w) => w?.attributes?.slug === slug);
  const slugs = texts.map((w) => w?.attributes?.slug).sort((a, b) => a - b);

  return {
    props: {
      text,
      slugs,
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
    fallback: 'blocking',
  };
};

export default Text;
