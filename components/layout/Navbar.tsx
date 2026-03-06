'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { SlGlobe } from "react-icons/sl";
import { getCategories } from '@/lib/category';


export function Navbar({ dict }: { dict: any }) {

  const logo = { image: "/logos/logo-vallarta-medical-network.png", alt: "Vallarta Medical Network"}
  // const categories = await getCategories()
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Opcion para abrir y cerrar el menu desplegable
  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          aria-hidden 
        />
      )}

      {/* Navbar */}
      <nav
        ref={navRef}
        className="bg-background border-b relative z-50"
      >
        <div className="max-w-full lg:max-w-7xl lg:mx-auto px-0 lg:px-12 z-50">
          {/* Top bar */}
          <div className="flex items-center justify-between  lg:justify-end py-3">
            <span className="font-bold text-primary block md:hidden">
              <img
                src={logo.image}
                alt={logo.alt} 
                className="h-[60px] lg:h-[80px] w-full" 
              />
            </span>

            {/* Desktop */}
            <div className="hidden md:flex gap-6 text-base items-center font-bold">
              <a className='text-brand-primary'>{dict.nav?.directory ?? 'Directorio'}</a>
              <a className='text-brand-primary'>{dict.nav?.hospitals ?? 'Hospitales'}</a>
              <a className='text-brand-primary'>{dict.nav?.clinics ?? 'Clínicas'}</a>
              <a className='text-brand-primary'>{dict.nav?.labs ?? 'Laboratorios'}</a>
              <a className='text-brand-primary'>{dict.nav?.dental ?? 'Clinica Dental'}</a>
              <a className='text-brand-primary'>{dict.nav?.news ?? 'Noticias'}</a>
              <a className='text-brand-primary'>{dict.nav?.events ?? 'Eventos'}</a>
              {/* <Link href={`/blog/category/${category.slug}`}>
                {category.name}
              </Link> */}

              <div className="flex items-center gap-2">
                <Icon icon="solar:magnifer-linear" />
                {dict.common?.search ?? 'Buscar'}
              </div>
            </div>

            {/* Mobile button */}
            <div className='grid grid-cols-2 gap-2'>
              <div 
                className='flex items-center justify-end  md:hidden'>
                  <SlGlobe  
                    className='w-[14px] mx-1'  
                  />
                  <span
                    className='text-base font-semibold'
                    >EN</span>
              </div>
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden text-primary"
                aria-label="Abrir menú"
              >
                <Icon
                  icon={open ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
                  className="text-3xl"
                />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden absolute left-0 right-0 bg-background border-b
              transition-all duration-300 ease-out
              ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
            `}
          >
            <div className="flex flex-col gap-4 px-4 py-5 text-sm">
              {/* Primer botón Directorio*/}
                <button
                  onClick={() => toggleMenu('directorio')}
                  className="flex items-center justify-between w-full text-left"
                >
                  {dict.nav?.directory ?? 'Directorio'}

                  <Icon
                    icon={openMenu === 'directorio'
                      ? "solar:alt-arrow-up-linear"
                      : "solar:alt-arrow-down-linear"}
                  />
                </button>

                {openMenu === 'directorio' && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex flex-col gap-2">
                      <a>Hospital 1</a>
                      <a>Hospital 2</a>
                    </div>

                    <div className="flex flex-col gap-2">
                      <a>Clínica 1</a>
                      <a>Clínica 2</a>
                    </div>
                  </div>
                )}
              { /* Segundo botón Especialidades*/}
              <button
                onClick={() => toggleMenu('especialidades')}
                className="flex items-center justify-between w-full text-left"
              >
                Especialidades

                <Icon
                  icon={openMenu === 'especialidades'
                    ? "solar:alt-arrow-up-linear"
                    : "solar:alt-arrow-down-linear"}
                />
              </button>

              {openMenu === 'especialidades' && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col gap-2">
                    <a>Cardiología</a>
                    <a>Dermatología</a>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a>Pediatría</a>
                    <a>Neurología</a>
                  </div>
                </div>
              )}

              <a onClick={() => setOpen(false)}>
                {dict.nav?.hospitals ?? 'Hospitales'}
              </a>
              <a onClick={() => setOpen(false)}>
                {dict.nav?.clinics ?? 'Clínicas'}
              </a>
              <a onClick={() => setOpen(false)}>
                {dict.nav?.labs ?? 'Laboratorios'}
              </a>

              {/* <div className="flex items-center gap-2 text-primary">
                <Icon icon="solar:magnifer-linear" />
                {dict.common?.search ?? 'Buscar'}
              </div> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}