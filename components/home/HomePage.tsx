import {
  NewsSection,
  AdsSection,
  FeaturedArticles,
} from '@/components/home';
import {
  TopBar,
  Header
} from '@/components/layout';

import { BlogGrid } from '@/components/blog/BlogGrid';
import { BlogFeatured } from '@/components/blog/BlogFeatured';
import { PromoBanner } from '@/components/ui/PromoBanner';
import  Footer  from '@/components/layout/Footer';
import SearchBar from "@/components/utils/SearchBar"
import Navbarpro from "@/components/layout/Navbar"
import BottomBar from "@/components/layout/Bottombar"
import HeroSlider from "@/components/home/HeroSlider"
import TopSection from "@/components/home/TopSection";
import Especialidades from '@/components/home/Especialidades';
import TopSections from "@/components/top-section";
import TitleSection from './TitleSection';
import EspecialidadesPage from '@/components/home/EspecialidadesPage';
import FaqSection from "@/components/home/faq-section";
import MedicalTravelSection from './MedicalTravelSection';

type HomePageProps = {
  dict: any
  promoBanner: any
  heroSlides: any[]
  popularPosts: any[]
  newestPosts: any[]
  featuredPosts: any[]
  adSection1: any
  adSection2: any
  locale:  "es" | "en"
}
export default async function HomePage({ 
  dict, 
  locale,
  promoBanner, 
  heroSlides,
  popularPosts,
  featuredPosts,
  newestPosts,
  adSection1,
  adSection2 }: HomePageProps) {
  // if (!dict) {
  //   return <h1>Loading…</h1>;
  // }

  return (
    <>
      {/* <div className="hidden md:block">
        <TopBar dict={dict?.topbar ?? {}} />
      </div> */}
      {/* <div className="sticky top-0 z-50 bg-background">
        <Header />        
      </div> */} 

      <main>
        
        {/* <TitleSection
          title={dict.sectiontitle.title}
          subtitle={dict.sectiontitle.subtitle}
          description={dict.sectiontitle.description}
        /> */}
         {/* Slider */}
        <section className="section-base py-4">
          <HeroSlider slides={heroSlides} />
        </section>
        
        {/* <SiteHeader /> */}
        <section className="section-soft py-4">
          <div className='my-16'>  
            {adSection1 && (
              <AdsSection data={adSection1.data as any} />
            )}
          </div>
        </section>

        {/* BLOG POPULARES */}
        <div className='section-base mt-16'>
          <div className='items-center text-center'>
            <h1 className="font-heading text-cyan-600 text-3xl font-semibold mt-10 text-center">
              Vallarta Medical Network BLOG</h1>
            <p className="text-slate-600 text-xl mt-2">
              Atención médica especializada.
            </p>
          </div>       
        
          {/* <BlogGrid posts={popularPosts} locale={locale} /> */}
           <BlogGrid posts={featuredPosts} locale={locale} />

        </div>
        
        {/* TOP DOCTORES */}
        <div className="section-soft py-4">
          <TopSection locale={locale}
          dict={dict.topSelector} />
        </div>

        <div className='my-16'>    
         {adSection2 && (
          <AdsSection data={adSection2.data as any} />
          )}
        </div>
        
        {/*  Top Section */}    
        {/* <TopSections /> */}

        <MedicalTravelSection />  
         
        {/* ESPECIALIDADES */}
        <EspecialidadesPage />

        {/* BLOG NUEVOS */}
        {/* <BlogFeatured posts={newestPosts} /> */} 
  
        {/* Faqs */}
        <div className="section-soft py-4">
          <FaqSection  locale={locale} /> 
        </div>
     
      </main>

      {/* <Footer
        locale={locale}
        dict={dict?.footer ?? {}}
      /> */}
     
    </>
  );
}