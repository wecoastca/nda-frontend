import { NavButton } from './navButton';

type ModalPropsType = {
  isVisible: boolean;
  onBackButtonClick?: () => void;
  Header?: React.ElementType;
};
export const Modal = ({
  isVisible,
  onBackButtonClick,
  Header,
  children,
  ...otherProps
}: ModalPropsType & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="w-full h-full fixed z-10 bg-white top-0 flex flex-col lg:hidden lg:-z-10"
      {...otherProps}
    >
      <div className="border-b border-[#FA6400] h-12 px-4 md:px-5 md:h-16 flex items-center">
        <NavButton
          onClick={onBackButtonClick && onBackButtonClick}
          direction="left"
        />
        <Header />
      </div>
      <div className="flex justify-center items-center h-full">{children}</div>
    </div>
  );
};
