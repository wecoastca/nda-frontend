import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetchAPI } from '../lib/api';
import { MetaContext } from '../pages/_app';
import { Logo } from './logo';

export const Header = ({
  ExtraComponent,
}: {
  ExtraComponent?: React.ElementType;
}) => {
  const { data: navigationItems } = useSWR(['/navigation-items'], fetchAPI);
  const meta = useContext<any>(MetaContext);
  const router = useRouter();

  return (
    <>
      <div className="sticky flex justify-between flex-wrap w-full bg-white z-10 border-b border-[#FA6400]">
        <nav className="flex md:gap-2 order-2 w-full md:w-auto md:order-1">
          <Link href="/">
            <a>
              <div className="w-14 h-14 md:w-20 md:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 border-r border-[#FA6400] hidden md:block">
                <div className="w-full h-full relative">
                  <Logo image={meta?.logo} />
                </div>
              </div>
            </a>
          </Link>
          <ul className="flex md:gap-8 items-center w-full md:w-auto justify-between md:justify-start px-4 md:px-0">
            {navigationItems?.data
              ?.sort((a, b) => a?.attributes?.order - b?.attributes?.order)
              .map((item) => {
                return (
                  <li key={item?.id}>
                    <Link href={`/${item.attributes.slug}`}>
                      <a
                        className={`text-sm md:text-xl italic capitalize hover:opacity-20 ${
                          router?.asPath.replace(/^\/|\/\d+$/g, '') ===
                          item.attributes.slug
                            ? 'line-through'
                            : null
                        } ${
                          !item.attributes.isActive
                            ? 'opacity-20 pointer-events-none cursor-default'
                            : null
                        }`}
                      >
                        {item.attributes.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
        <div className="md:mr-4 order-1 md:order-2 flex justify-between w-full md:w-auto border-b border-[#FA6400] md:border-0">
          <Link href="/">
            <a>
              <div className="w-14 h-14 md:w-20 md:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 md:hidden">
                <div className="w-full h-full relative">
                  <Logo image={meta?.logo} />
                </div>
              </div>
            </a>
          </Link>
          <a href="mailto:test@test.com" className="self-center mr-4 md:mr-8">
            <span className="text-sm md:text-xl italic hover:opacity-20">
              Contact
            </span>
          </a>
        </div>
      </div>
      {ExtraComponent && <ExtraComponent />}
    </>
  );
};
