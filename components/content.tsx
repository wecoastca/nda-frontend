export type ContentProps = {
  sidebarProps?: React.ComponentProps<'div'>;
  children: any;
  mainContentProps?: React.ComponentProps<'div'>;
};

export const Content = ({
  sidebarProps,
  children,
  mainContentProps,
}: ContentProps) => {
  return (
    <div className="flex w-screen overflow-hidden flex-1 mb-10 md:mb-16 lg:mb-0">
      <div
        className="hidden w-16 xl:w-20 border-r border-[#FA6400] lg:flex shrink-0"
        {...sidebarProps}
      ></div>
      <div
        className="flex flex-col flex-1 lg:my-0 lg:flex-row lg:justify-start"
        {...mainContentProps}
      >
        {children}
      </div>
    </div>
  );
};
