import { useRouter } from 'next/router';
import Nav from './nav';

const CATEGORIES = [
  {
    id: 1,
    attributes: {
      name: 'works',
      slug: 'works',
      createdAt: '2022-02-17T13:09:14.159Z',
      updatedAt: '2022-02-17T13:09:14.159Z',
      articles: {
        data: [
          {
            id: 1,
            attributes: {
              title: "What's inside a Black Hole",
              description: 'Maybe the answer is in this article, or not...',
              content: "Well, we don't know yet...",
              slug: 'what-s-inside-a-black-hole',
              createdAt: '2022-02-17T13:09:17.869Z',
              updatedAt: '2022-02-17T13:09:17.869Z',
              publishedAt: '2022-02-17T13:09:16.094Z',
            },
          },
        ],
      },
    },
  },
  {
    id: 2,
    attributes: {
      name: 'texts',
      slug: 'texts',
      createdAt: '2022-02-17T13:09:14.159Z',
      updatedAt: '2022-02-17T13:09:14.159Z',
      articles: {
        data: [
          {
            id: 4,
            attributes: {
              title: 'A bug is becoming a meme on the internet',
              description:
                'How a bug on MySQL is becoming a meme on the internet',
              content:
                "It's the story of a user named **Omer Barnir** who reported a bug in 2005 on the MySQL [bug report platform](https://bugs.mysql.com/)\n\nBut the thing is that Omer never got an answer. 15 years later, the bug has never been fix and people are starting to make fun out of it. We let you take a look at the conversation [here](https://bugs.mysql.com/bug.php?id=11472), it's pretty funny",
              slug: 'a-bug-is-becoming-a-meme-on-the-internet',
              createdAt: '2022-02-17T13:09:18.025Z',
              updatedAt: '2022-02-17T13:09:18.025Z',
              publishedAt: '2022-02-17T13:09:16.095Z',
            },
          },
        ],
      },
    },
  },
  {
    id: 3,
    attributes: {
      name: 'about',
      slug: 'about',
      createdAt: '2022-02-17T13:09:14.160Z',
      updatedAt: '2022-02-17T13:09:14.160Z',
      articles: {
        data: [
          {
            id: 6,
            attributes: {
              title: 'We love Pizza',
              description: 'Pizza is so delicious, specially four cheese pizza',
              content: 'We love pizza at Strapi, what about you?',
              slug: 'we-love-pizza',
              createdAt: '2022-02-17T13:09:18.108Z',
              updatedAt: '2022-02-17T13:09:18.108Z',
              publishedAt: '2022-02-17T13:09:16.095Z',
            },
          },
        ],
      },
    },
  },
];

const Layout = ({
  children,
  categories,
  sidebarProps,
}: {
  children: any;
  categories: any;
  sidebarProps?: any;
}) => {
  const router = useRouter();
  // layout-sp
  return (
    <div className="flex flex-col h-screen">
      <Nav categories={CATEGORIES} />

      <div className="flex w-screen overflow-hidden flex-1">
        <div
          className="hidden w-16 xl:w-20 border-r border-yellow-500 lg:flex shrink-0"
          {...sidebarProps}
        ></div>
        <div className="flex flex-col justify-evenly lg:my-0 lg:flex-row lg:justify-start">
          {children}
        </div>
      </div>

      {router?.asPath === '/' ? (
        <div className="bottom-0 w-full h-20 border-t border-yellow-500 bg-white flex items-center">
          <p className="ml-4">
            Idea — <span className="text-yellow-500">wid0ki</span>,
            illustrations —{' '}
            <span className="text-yellow-500">Margarita Shatalova</span>, code —{' '}
            <span className="text-yellow-500">Anton Shishov</span>
          </p>
        </div>
      ) : (
        <div className="bottom-0 w-full h-10 border-t border-yellow-500 bg-white flex items-center overflow-scroll md:h-16 lg:h-14 2xl:h-20">
          <p className="mx-4 relative whitespace-nowrap">
            If you want add your work here especially not under NDA —
            <div className="inline-block blur-lg h-4 w-20 absolute bg-orange-500"></div>
            <span className="z-10">drop a line</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Layout;
