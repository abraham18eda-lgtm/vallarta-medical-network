import { ReactNode } from 'react';
// import { getDictionary } from '@/i18n/getDictionary';
import '../globals.css';

type Props = {
  children: ReactNode;
};

export default function LocaleLayout({ children }: Props) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
