import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = ({ categories }: { categories: any }) => {
  const router = useRouter();
  return (
    <div className="sticky flex justify-between flex-wrap w-full bg-white z-10 border-b border-yellow-500">
      <nav className="flex md:gap-2 order-2 w-full md:w-auto md:order-1">
        <Link href="/">
          <a>
            <div className="w-14 h-14 md:w-20 md:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-neutral-400 border-r border-yellow-500 hidden md:block"></div>
          </a>
        </Link>
        <ul className="flex md:gap-8 items-center w-full md:w-auto justify-between md:justify-start px-4 md:px-0">
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <Link href={`/${category.attributes.slug}`}>
                  <a
                    className={`text-sm md:text-xl italic capitalize hover:opacity-20 ${
                      router?.asPath === `/${category.attributes.slug}`
                        ? 'line-through'
                        : null
                    }`}
                  >
                    {category.attributes.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="md:mr-4 order-1 md:order-2 flex justify-between w-full md:w-auto border-b border-yellow-500 md:border-0">
        <Link href="/">
          <a>
            <div className="w-14 h-14 md:w-20 md:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-neutral-400 md:hidden"></div>
          </a>
        </Link>
        <button className="mr-4 md:mr-8">
          <span className="text-sm md:text-xl italic hover:opacity-20">
            Contact
          </span>
        </button>
      </div>
    </div>
  );
};

export default Nav;
