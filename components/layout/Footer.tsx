


import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getBlogNews } from '@/lib/getBlogNews';
import DoctorLoginButton from '@/components/utils/DoctorLoginButton';
import { getFeaturedCategories } from "@/lib/getFeaturedCategories";


const logo = { image: "/logos/logo-vallarta-medical-network-footer-bco.png", alt: "Logo Vallarta Meical Network"}

export default async function Footer({ locale, dict }: any) {
  if (!dict) return null;

  // const [openLogin, setOpenLogin] = useState(false);
  
  const posts = await getBlogNews(locale);
  const categories = await getFeaturedCategories(8);

  return (
    <footer className=" bg-gradient-to-br from-[#0F4C81] to-[#0B3558] text-slate-100 pt-16 pb-8">
      <div className="max-w-6xl  mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 flex justify-center">
  
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
          {/* <div className='my-4'>
            <h3 className='md:text-xl text-white'>{dict.footer?.about.title}</h3>
          </div> */}
         
          {/* <div className="flex gap-3 mt-6">
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
          </div> */}

           {/* Login */}
           <div className='mt-8'>
              <DoctorLoginButton variant="footer" />
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
          {/* {dict.latestNews.title} */} Noticias
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
            {/* {dict.categories.title} */}
            Categorias
          </h3>

          <ul className="grid grid-cols-1 gap-3 text-sm">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/directorio/${category.slug}`}
                  className="flex items-center justify-between text-slate-400 transition hover:text-sky-300"
                >
                  <span>{category.name}</span>

                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs">
                    {category._count.doctors}
                  </span>
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