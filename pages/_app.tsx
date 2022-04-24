import App, { AppProps } from 'next/app';
import Head from 'next/head';
import '../assets/css/style.css';
import { createContext } from 'react';
import { fetchAPI } from '../lib/api';
import { getStrapiMedia } from '../lib/media';

export type BaseResponse<T> = {
  data: {
    id: number;
    attributes: T;
  };
};

export type ImageResponseType = {
  alternativeText: string;
  caption: string;
  createdAt: string;
  ext: string;
  formats: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
};

export type MetaType = {
  siteName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  favicon: BaseResponse<ImageResponseType>;
  logo: BaseResponse<ImageResponseType>;
  footer: {
    id: number;
    linkColor: string;
    isBluredLink: boolean;
    content: string;
  };
  indexFooter: {
    id: number;
    linkColor: string;
    isBluredLink: boolean;
    content: string;
  };
};

// Store Strapi Global object in context
export const MetaContext = createContext<MetaType>(null);

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { meta } = pageProps;
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(meta.attributes.favicon)}
        />
      </Head>
      <MetaContext.Provider value={meta.attributes}>
        <Component {...pageProps} />
      </MetaContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const metaRes = await fetchAPI('/meta', {
    populate: '*',
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { meta: metaRes.data } };
};

export default MyApp;
