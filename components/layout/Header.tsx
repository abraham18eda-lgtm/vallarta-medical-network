'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from "next/image"
import { useState, useRef, useEffect } from 'react';
import { Navbar } from './Navbar';

type HeaderProps = {
  promoBanner?: {
    image: string
    alt: string
    link?: string
  } | null
}

const logo = { image: "/logos/logo-vallarta-medical-network.png", alt: "Vallarta Meical Network"}

export function Header({ promoBanner }: HeaderProps) {

  return (
    <header className="sticky top-0 border-b"> {/* md:py-4 md:px-4 */}
      <div className="md:max-w-6xl md:mx-auto flex items-center md:gap-4 md:justify-end">
        {/* <div className="size-12 bg-primary rounded-xl flex items-center justify-center text-white">
          <Icon icon="solar:medical-kit-bold" />
        </div> */}
        <div className='hidden lg:block'>
          <Link href="/">
            <div className="relative h-[60px] lg:h-[100px] w-[200px]">
              <Image
                src={logo.image}
                alt={logo.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        <div className='w-full md:w-3/4 py-1 md:py-1'>
          {promoBanner && (
            <Link href={promoBanner.link ?? "/"}>
               <div className="relative h-[100px] lg:h-[100px] w-full ">
                <Image
                  src={`/${promoBanner.image.replace(/^\/+/, "")}`}
                  alt={promoBanner.alt}
                  fill
                  className="object-cover"
                />
                <div className='absolute inset-0 bg-black/20 z-10'></div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}