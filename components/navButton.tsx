import { ButtonHTMLAttributes } from 'react';

export const NavButton = ({
  onClick,
  direction,
  ...otherProps
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  direction: 'left' | 'right';
}) => {
  const leftArrowSvg =
    'M10.3409 21L12.0909 19.25L4.88636 12.0682H23.5455V9.56818H4.88636L12.0909 2.36364L10.3409 0.636364L0.159091 10.8182L10.3409 21Z';
  const rightArrowSvg =
    'M13.2045 21L23.3864 10.8182L13.2045 0.636364L11.4545 2.38636L18.6591 9.56818H0V12.0682H18.6591L11.4545 19.2727L13.2045 21Z';
  return (
    <button onClick={onClick && onClick} {...otherProps}>
      <svg
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={direction === 'left' ? leftArrowSvg : rightArrowSvg}
          fill="black"
        />
      </svg>
    </button>
  );
};
