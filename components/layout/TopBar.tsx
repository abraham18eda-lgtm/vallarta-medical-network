'use client';

import { Icon } from '@iconify/react';
import { SlGlobe } from "react-icons/sl";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import Link from 'next/link';

export function TopBar({ dict }: { dict: any }) {
   if (!dict) return null;
  return (
    <div className="w-full bg-muted border-b py-1 px-4">
      <div className="max-w-6xl mx-auto flex justify-between text-sm font-normal">
        <span className="opacity-70 text-dark">
          {dict.welcome}
        </span>
        <div className='grid grid-cols-3 gap-2'>
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
        </div>
      </div>
    </div>
  );
}