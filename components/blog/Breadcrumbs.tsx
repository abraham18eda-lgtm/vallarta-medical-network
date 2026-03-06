import Link from 'next/link';

export function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav className="text-sm mb-6 text-muted-foreground">
      <Link href="/" className="hover:text-primary">Inicio</Link>
      {' / '}
      <Link href="/blog" className="hover:text-primary">Blog</Link>
      {' / '}
      <span className="text-foreground">{title}</span>
    </nav>
  );
}