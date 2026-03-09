
import {
  HeroSlider,
  NewsSection,
  AdsSection,
  FeaturedArticles,
} from '@/components/home';
import {
  TopBar,
  Header,
  Navbar,
} from '@/components/layout';

import { BlogGrid } from '@/components/blog/BlogGrid';
import { BlogFeatured } from '@/components/blog/BlogFeatured';
import { PromoBanner } from '@/components/ui/PromoBanner';
import  Footer  from '@/components/layout/Footer';


type HomePageProps = {
  dict: any
  promoBanner: any
  heroSlides: any[]
  popularPosts: any[]
  newestPosts: any[]
  adSection1: any
  adSection2: any
  locale: string
}
export default async function HomePage({ 
  dict, 
  locale,
  promoBanner, 
  heroSlides,
  popularPosts,
  newestPosts,
  adSection1,
  adSection2 }: HomePageProps) {
  // if (!dict) {
  //   return <h1>Loading…</h1>;
  // }
  return (
    <>
      <div className="hidden md:block">
        <TopBar dict={dict?.topbar ?? {}} />
      </div>
      <div className="sticky top-0 z-50 bg-background">
        <Header promoBanner={promoBanner}/>
        <Navbar dict={dict} />
      </div>

      <main>
         {/* Slider */}
        <HeroSlider slides={heroSlides} />
        <div className='items-center text-center'>
          <h1 className="font-title text-4xl font-semibold mt-10 text-center">
            Vallarta Medical Network</h1>
          <p className="text-gray-600 text-xl">
            Atención médica especializada.
          </p>
        </div>
        
        {/* BLOG POPULARES */}
        <BlogGrid posts={popularPosts} />

        {adSection1 && (
          <AdsSection data={adSection1.data as any} />
        )}

        {/* BLOG NUEVOS */}
        <BlogFeatured posts={newestPosts} />

        
        {adSection2 && (
          <AdsSection data={adSection2.data as any} />
        )}

        {/* <BlogGrid posts={dict?.blog?.posts ?? []} />
        <PromoBanner data={dict?.promoBanner ?? {}} />
        <BlogFeatured posts={dict?.blog?.posts ?? []} /> */}
        {/* <NewsSection dict={dict} /> */}
        {/* <FeaturedArticles dict={dict} /> */}
         {/* <PromoBanner data={dict?.promoBanner ?? {}} /> */}
      </main>

      <Footer
        locale={locale}
        dict={dict?.footer ?? {}}
      />
    </>
  );
}