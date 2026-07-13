'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
// import { usePathname, useRouter } from "next/navigation";
// import { switchLocale } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import DoctorLoginButton from '../utils/DoctorLoginButton';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

import { cn } from '@/lib/cn';

const logo = {
  image: '/logos/logo-vallarta-medical-network.png',
  alt: 'Vallarta Medical Network',
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const { t, locale } = useDictionary();
  const router = useRouter();
  const pathname = usePathname();
  const ctx = useDictionary();

  // console.log("DICT CONTEXT:", ctx);
  const handleLocaleChange = (newLocale: "es" | "en") => {
  const currentPath = window.location.pathname;

    const routes: Record<string, string> = {
      "/directorio": "/directory",
      "/directory": "/directorio",

      "/clinicas": "/clinics",
      "/clinics": "/clinicas",

      "/hospitales": "/hospital",
      "/hospital": "/hospitales",

      "/laboratorios": "/laboratories",
      "/laboratories": "/laboratorios",

      "/dentales": "/dental",
      "/dental": "/dentales",
    };


    const cleanPath = currentPath
      .replace(/^\/(es|en)/, "");


    const translated =
      routes[cleanPath] ?? cleanPath;


    router.push(`/${newLocale}${translated}`);
  };

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

      <div className="mx-auto flex h-20 max-w-7xl items-center px-4">
        {/* LEFT: LOGO + SEARCH */}
        <div className="flex flex-1 items-center gap-6">

          {/* LOGO */}
          <div className="hidden w-[200px] md:flex items-center">
            <Image
              src={logo.image}
              alt={logo.alt}
              width={180}
              height={60}
              className="object-contain"
              priority
            />
          </div>

          {/* SEARCH */}
          <div className="flex flex-1 justify-center">
            <div className="w-full max-w-xl">
              <SearchBar locale={locale} />
            </div>
          </div>

        </div>

        {/* RIGHT: LANG + LOGIN */}
        <div className="flex items-center gap-2 px-2 py-1">

          {/* LANG */}
          <div className="flex items-center py-1 gap-1 rounded-full hover:bg-gray-50 hover:bg-gray-100transition md:p-2">  
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600 hidden md:block"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 21a9 9 0 1 0 0-18m0 18a9 9 0 1 1 0-18m0 18c2.761 0 3.941-5.163 3.941-9S14.761 3 12 3m0 18c-2.761 0-3.941-5.163-3.941-9S9.239 3 12 3M3.5 9h17m-17 6h17"
              />
            </svg>

            <button
              onClick={() =>
                handleLocaleChange(locale === "es" ? "en" : "es")
              }
              // className="bg-[#ccc] md:bg-white p-4 text-base font-semibold text-gray-700 hover:text-blue-600 leading-none tracking-wide"
              className="
                flex h-10 items-center justify-center
                rounded-xl
                border border-gray-200/80 md:border-0
                bg-white/80
                px-4 md:px-0
                text-sm font-semibold tracking-wide text-gray-700
                backdrop-blur-md
                shadow-sm md:shadow-none
                transition-all duration-200 ease-out

                hover:border-gray-300
                hover:bg-white
                hover:shadow-md

                active:scale-[0.96]
                active:translate-y-px
                active:shadow-inner

                select-none
              "
            >
              {locale === "es" ? "EN" : "ES"}
            </button>

          </div>

          {/* LOGIN */}
          <div className="flex hidden md:block">
            <DoctorLoginButton
              open={openLogin}
              setOpen={setOpenLogin}
            />
          </div>

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
          {/* <div className="hidden items-center gap-4 text-sm text-slate-500 md:flex">

            <a href="#" className="hover:text-[#0F4C81]">
              Facebook
            </a>

            <a href="#" className="hover:text-[#0F4C81]">
              Instagram
            </a>

            <a href="#" className="hover:text-[#0F4C81]">
              YouTube
            </a>

          </div> */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F4C81] hover:bg-[#0F4C81] hover:text-white"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F4C81] hover:bg-[#0F4C81] hover:text-white"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F4C81] hover:bg-[#0F4C81] hover:text-white"
            >
              <FaYoutube size={18} />
            </a>
          </div>

        </div>
      </div>

    </header>
  );
}