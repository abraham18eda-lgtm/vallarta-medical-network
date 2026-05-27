'use client';

import { Icon } from '@iconify/react';
import { SlGlobe } from "react-icons/sl";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import Link from 'next/link';
import { useState } from "react"
import AuthModal from "@/components/ui/AuthModal"
import DoctorLoginButton from "@/components/utils/DoctorLoginButton"

export function TopBar({ dict }: { dict: any }) {
  const [open, setOpen] = useState(false)
   if (!dict) return null;
  return (
    <div className="w-full bg-muted border-b py-1 px-4">
      <div className="max-w-6xl mx-auto flex justify-between text-sm font-normal">
        <span className="opacity-70 text-dark">
          {dict.welcome}
        </span>
        <div className='grid grid-cols-4 gap-2'>
          <div className="flex items-center gap-4">
            <FaFacebook className='h-[22px]' />
            <IoLogoInstagram className='h-[22px]' /> <span className='text-brand-primary font-bold'>|</span>
          </div>
          <div className='flex gap-2 items-center'>
             <Link
                  href="/blog"
                  className="flex items-center gap-1 font-medium hover:underline mx-1"
                  >
                  <Icon icon="solar:document-text-linear" />
                  {dict.topbar?.blog ?? 'Blog'}
              </Link> <span className='text-brand-primary font-bold'>|</span>
          </div>
          <div 
            className='flex items-center justify-end'> 
              <SlGlobe  
                className='w-[14px] mx-1'  
              />
              <span
                className='text-base font-semibold'
                >EN</span>
          </div>
          {/* <div className=''>
             <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Ingresar
              </button>

              {open && <AuthModal onClose={() => setOpen(false)} />}
          </div> */}
           {/* (DESKTOP) */}
          <div className="grid grid-cols-2 flex justify-center px-2 gap-2 hidden md:block">
            <div className="md:hidden flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path fill="currentColor" d="M21.41 8.64v-.05a10 10 0 0 0-18.78 0s0 0 0 .05a9.86 9.86 0 0 0 0 6.72v.05a10 10 0 0 0 18.78 0s0 0 0-.05a9.86 9.86 0 0 0 0-6.72M4.26 14a7.8 7.8 0 0 1 0-4h1.86a16.7 16.7 0 0 0 0 4Zm.82 2h1.4a12 12 0 0 0 1 2.57A8 8 0 0 1 5.08 16m1.4-8h-1.4a8 8 0 0 1 2.37-2.57A12 12 0 0 0 6.48 8M11 19.7A6.34 6.34 0 0 1 8.57 16H11Zm0-5.7H8.14a14.4 14.4 0 0 1 0-4H11Zm0-6H8.57A6.34 6.34 0 0 1 11 4.3Zm7.92 0h-1.4a12 12 0 0 0-1-2.57A8 8 0 0 1 18.92 8M13 4.3A6.34 6.34 0 0 1 15.43 8H13Zm0 15.4V16h2.43A6.34 6.34 0 0 1 13 19.7m2.86-5.7H13v-4h2.86a14.4 14.4 0 0 1 0 4m.69 4.57a12 12 0 0 0 1-2.57h1.4a8 8 0 0 1-2.4 2.57M19.74 14h-1.86a16 16 0 0 0 .12-2a16 16 0 0 0-.12-2h1.86a7.8 7.8 0 0 1 0 4" />
              </svg>EN
            </div> 
              <DoctorLoginButton
                open={open}
                setOpen={setOpen}
                // session={session}
              />
          </div>
        </div>
      </div>
    </div>
  );
}