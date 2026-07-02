'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import Navbar from './Navbar';
import SearchBar from './SearchBar';
import DoctorLoginButton from '../utils/DoctorLoginButton';

import { cn } from '@/lib/cn';

const logo = {
  image: '/logos/logo-vallarta-medical-network.png',
  alt: 'Vallarta Medical Network',
};

export function Header({ locale = 'es' }: { locale?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm'
          : 'bg-white'
      )}
    >

      {/* ===================== */}
      {/* TOP BAR */}
      {/* ===================== */}

      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4">

        {/* LOGO */}
        <div className="flex w-[200px] items-center hidden md:block">
          <Image
            src={logo.image}
            alt={logo.alt}
            width={180}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        {/* SEARCH (CENTRO FLEXIBLE) */}
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-xl ">
            <SearchBar locale={locale} />
          </div>
        </div>

        <div className='block md:hidden '>
          EN
        </div>

        {/* LOGIN */}
        <div className="flex md:w-[200px] justify-end">
          <DoctorLoginButton
            open={openLogin}
            setOpen={setOpenLogin}
          />
        </div>

      </div>

      {/* ===================== */}
      {/* NAVBAR SECOND ROW */}
      {/* ===================== */}

      <div className="border-t border-slate-100 bg-white hidden md:block">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">

          {/* NAVBAR LEFT */}
          <div className="flex flex-1">
            <Navbar locale={locale} />
          </div>

          {/* SOCIAL RIGHT */}
          <div className="hidden items-center gap-4 text-sm text-slate-500 md:flex">

            <a href="#" className="hover:text-[#0F4C81]">
              Facebook
            </a>

            <a href="#" className="hover:text-[#0F4C81]">
              Instagram
            </a>

            <a href="#" className="hover:text-[#0F4C81]">
              YouTube
            </a>

          </div>

        </div>
      </div>

    </header>
  );
}