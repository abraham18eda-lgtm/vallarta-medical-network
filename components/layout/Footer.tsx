import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getBlogNews } from '@/lib/getBlogNews';


const logo = { image: "/logos/logo-vallarta-medical-network.png", alt: "Vallarta Meical Network"}

export default async function Footer({ locale, dict }: any) {
  if (!dict) return null;
  const posts = await getBlogNews(locale);
  return (
    <footer className="bg-slate-900 text-slate-100 pt-16 pb-10">
      <div className="max-w-6xl  mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 flex justify-center">

        {/* ───────────────────── Col 1: About */}
        <div>
          <img
            src={logo.image}
            alt={logo.alt}
            className="h-14 mb-4"
          />

          <p className="text-sm text-slate-400 leading-relaxed">
            {dict.about.description}
          </p>
          <div className='my-4'>
            <h3 className='md:text-xl text-white'>{dict.footer?.about.title}</h3>
          </div>
          <div className="flex gap-3 mt-6">
            {dict.about.socials.map((social: any) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                className="p-2 rounded-full bg-white/10 hover:bg-primary transition"
              >
                <Icon icon={social.icon} className={social.width} />
              </a>
            ))}
          </div>
        </div>

        {/* ───────────────────── Col 2: Latest News */}
        {/* <div>
          <h3 className="text-lg font-semibold mb-6">
            {dict.latestNews.title}
          </h3>

          <div className="space-y-5">
            {dict.latestNews.items.map((post: any) => (
              <Link
                key={post.slug}
                href={post.slug}
                className="flex gap-4 group"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />

                <div>
                  <p className="text-sm font-medium group-hover:text-primary transition line-clamp-2">
                    {post.title}
                  </p>

                  <div className="text-xs text-slate-400 mt-1 flex gap-2">
                    <span className="uppercase">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div> */}
        {/* ───────────────────── Col 2: Latest News */}
      <div>
        <h3 className="text-lg font-semibold mb-6">
          {dict.latestNews.title}
        </h3>

        <div className="space-y-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="flex gap-4 group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />

              <div>
                <p className="text-sm font-medium group-hover:text-primary transition line-clamp-2">
                  {post.title}
                </p>

                <div className="text-xs text-slate-400 mt-1 flex gap-2">
                  <span className="uppercase">
                    {/* {post.Category.name} */}
                  </span>

                  <span>•</span>

                  <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

        {/* ───────────────────── Col 3: Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-6">
            {dict.categories.title}
          </h3>

          <ul className="grid grid-cols-1 gap-3 text-sm">
            {dict.categories.items.map((cat: string) => (
              <li key={cat}>
                <Link
                  href={`/blog?category=${cat}`}
                  className="text-slate-400 hover:text-primary transition"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─────────── Bottom */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs text-slate-400">
        <div className='grid grid-cols-2 gap-4 flex justify-between'>
          <div className=''>
            © {new Date().getFullYear()} Vallarta Medical Network. Todos los derechos reservados.
          </div>
          <div>
              <Link
                href="/"
                  className="text-slate-400 hover:text-primary transition mx-4"
              > Preguntas frecuentes</Link>
              <Link
                href="/"
                  className="text-slate-400 hover:text-primary transition"
              > Aviso de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}