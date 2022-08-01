import { ContentProps } from './content';
import { Layout } from './layout';
import { NavButton } from './navButton';

const NavMobile = ({ onPrevious, onNext }) => (
  <div className="flex justify-between w-screen sticky border-b border-[#FA6400] h-12 px-4 md:px-5 md:h-16 lg:hidden">
    <NavButton
      onClick={onPrevious}
      direction="left"
      className="active:opacity-60"
    />
    <NavButton
      onClick={onNext}
      direction="right"
      className="active:opacity-60"
    />
  </div>
);

export const SwitchingLayout = ({
  onNext,
  onPrevious,
  children,
  layoutContainerProps,
  contentProps,
}: {
  onNext: () => void;
  onPrevious: () => void;
  children: any;
  layoutContainerProps?: React.ComponentProps<'div'>;
  contentProps?: ContentProps;
}) => {
  return (
    <Layout
      ExtraHeaderComponent={() => (
        <NavMobile onNext={onNext} onPrevious={onPrevious} />
      )}
      layoutContainerProps={{
        onKeyDown: (e) => {
          if (e?.key === 'ArrowLeft') {
            onPrevious();
          }
          if (e?.key === 'ArrowRight') {
            onNext();
          }
        },
        ...layoutContainerProps,
      }}
      contentProps={{
        sidebarProps: {
          children: (
            <NavButton
              onClick={onPrevious}
              direction="left"
              className="hidden mx-auto lg:block hover:opacity-60"
            />
          ),
        },
        ...contentProps,
      }}
    >
      {children}
      <div className="absolute top-[44%] right-[-46px] border-2 hover:border-4 rounded-full hover:opacity-60 border-[#F9B78B] hover:border-[rgb(249,183,139,0.6)] hidden lg:block">
        <NavButton
          onClick={onNext}
          direction="right"
          className="m-10 relative right-5"
        />
      </div>
    </Layout>
  );
};
