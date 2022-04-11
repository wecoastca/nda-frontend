import Link from 'next/link';
import { useRouter } from 'next/router';
import Nav from './nav';

const Layout = ({
  children,
  sidebarProps,
  layoutContainerProps,
}: {
  children: any;
  sidebarProps?: any;
  layoutContainerProps?: React.ComponentPropsWithoutRef<'div'>;
}) => {
  const router = useRouter();
  return (
    // TODO: Вынеси в стили
    <div
      className="flex flex-col h-screen"
      style={{ minHeight: '-webkit-fill-available' }}
      {...layoutContainerProps}
    >
      <Nav />

      <div className="flex w-screen overflow-hidden flex-1">
        <div
          className="hidden w-16 xl:w-20 border-r border-yellow-500 lg:flex shrink-0"
          {...sidebarProps}
        ></div>
        <div className="flex flex-col lg:my-0 lg:flex-row lg:justify-start">
          {children}
        </div>
      </div>

      {router?.asPath === '/' ? (
        <div className="bottom-0 w-full h-20 border-t border-yellow-500 bg-white flex items-center sticky">
          <p className="ml-4">
            Idea —{' '}
            <Link href="/">
              <a>
                <span className="text-yellow-500">wid0ki</span>
              </a>
            </Link>
            , illustrations —{' '}
            <Link href="/">
              <a>
                <span className="text-yellow-500">Margarita Shatalova</span>
              </a>
            </Link>
            , code —{' '}
            <Link href="/">
              <a>
                <span className="text-yellow-500">Anton Shishov</span>
              </a>
            </Link>
          </p>
        </div>
      ) : (
        <div className="bottom-0 w-full h-10 border-t border-yellow-500 bg-white flex items-center overflow-scroll md:h-16 lg:h-14 2xl:h-20 sticky">
          <p className="mx-4 relative whitespace-nowrap">
            <a href="mailto:test@test.com">
              <div className="inline-block blur-lg h-4 w-20 absolute bg-orange-500"></div>
              <span className="z-10">drop a line</span>
            </a>
            — If you want add your work here especially not under NDA
          </p>
        </div>
      )}
    </div>
  );
};

export default Layout;
