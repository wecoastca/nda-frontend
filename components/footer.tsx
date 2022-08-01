import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';
import { MetaContext } from '../pages/_app';
import { marked } from 'marked';

export const Footer = () => {
  const router = useRouter();
  const footerContainter = useRef<HTMLDivElement>(null);
  const { footer, indexFooter } = useContext(MetaContext);
  const { content, isBluredLink, linkColor } =
    router?.asPath === '/' ? indexFooter : footer;
  const markedContent = marked.parse(content);

  useEffect(() => {
    footerContainter?.current.querySelectorAll('a').forEach((link) => {
      if (isBluredLink) {
        link.style.display = 'inline-flex';
        const blurCircle = document.createElement('div');

        blurCircle.style.filter = 'blur(14px)';
        blurCircle.style.width = `${8 * link.text.length}px`;
        blurCircle.style.height = `32px`;
        blurCircle.style.position = `absolute`;
        blurCircle.style.backgroundColor = linkColor;
        blurCircle.style.zIndex = '-10';

        link.appendChild(blurCircle);
      } else {
        link.style.color = linkColor;
      }
    });
  }, []);

  return (
    <div
      className="bottom-0 w-full h-10 md:h-16 lg:h-14 2xl:h-20 border-t border-[#FA6400] bg-white flex items-center sticky px-4 whitespace-nowrap overflow-x-scroll overflow-y-hidden"
      dangerouslySetInnerHTML={{
        __html: markedContent,
      }}
      ref={footerContainter}
    ></div>
  );
};
