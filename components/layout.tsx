import { useRouter } from 'next/router';
import Nav from './nav';

const Layout = ({
  children,
  categories,
  sidebarProps,
  layoutContainerProps,
}: {
  children: any;
  categories: any;
  sidebarProps?: any;
  layoutContainerProps?: React.ComponentPropsWithoutRef<'div'>;
}) => {
  const router = useRouter();
  // layout-sp
  return (
    <div className="flex flex-col h-screen" {...layoutContainerProps}>
      <Nav categories={categories} />

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
            <a href="mailto:test@test.com">
              <div className="inline-block blur-lg h-4 w-20 absolute bg-orange-500"></div>
              <span className="z-10">drop a line</span>
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Layout;
