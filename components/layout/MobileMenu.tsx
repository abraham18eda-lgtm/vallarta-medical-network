'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  locale: string;
};

export default function MobileMenu({ open, setOpen, locale }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />

          {/* PANEL */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-full w-80 bg-white p-6 shadow-xl"
          >

            <h2 className="mb-6 text-lg font-bold text-[#0F4C81]">
              Menú
            </h2>

            <nav className="flex flex-col gap-4">

              {[
                { name: 'Especialidades', href: '#' },
                { name: 'Doctores', href: '#' },
                { name: 'Clínicas', href: '#' },
                { name: 'Laboratorios', href: '#' },
                { name: 'Blog', href: '#' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-700 hover:text-[#0F4C81]"
                >
                  {item.name}
                </Link>
              ))}

            </nav>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}