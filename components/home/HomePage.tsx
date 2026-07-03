import {
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
import SearchBar from "@/components/utils/SearchBar"
import Navbarpro from "@/components/layout/Navbar"
import BottomBar from "@/components/layout/Bottombar"
import HeroSlider from "@/components/home/HeroSlider"
import TopSection from "@/components/home/TopSection";
// import TopSectionClinic from '@/components/home/TopSectionClinic';
// import TopSectionDental from '@/components/home/TopSectionDental';
// import TopOftalmologia from "@/components/home/TopOftalmologia";
import Especialidades from '@/components/home/Especialidades';
import TopSections from "@/components/top-section";
import TitleSection from './TitleSection';


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
      {/* <div className="hidden md:block">
        <TopBar dict={dict?.topbar ?? {}} />
      </div> */}
      <div className="sticky top-0 z-50 bg-background">
        <Header />
        {/* <div className="hidden md:block">
          <Header  />
          <Navbarpro />
        </div>    */}
      </div>

      <main>
        
        <TitleSection
          title={dict.hero.title}
          subtitle={dict.hero.subtitle}
          description={dict.hero.description}
        />
         {/* Slider */}
        <HeroSlider slides={heroSlides} />

        <div className='my-16'>  
          {adSection1 && (
            <AdsSection data={adSection1.data as any} />
          )}
        </div>

        {/* BLOG POPULARES */}
        <div className='my-16'>
          <div className='items-center text-center'>
            <h1 className="font-title text-4xl font-semibold mt-10 text-center">
              Vallarta Medical Network BLOG</h1>
            <p className="text-gray-600 text-xl">
              Atención médica especializada.
            </p>
          </div>       
        
          <BlogGrid posts={popularPosts} locale={locale} />
        </div>
        
        {/* TOP DOCTORES */}
        <div className="">
          <TopSection />
        </div>

        <div className='my-16'>    
         {adSection2 && (
          <AdsSection data={adSection2.data as any} />
          )}
        </div>
        
        {/*  Top Section */}    
        <TopSections />

        {/* ESPECIALIDADES */}
        <Especialidades />

        {/* BLOG NUEVOS */}
        {/* <BlogFeatured posts={newestPosts} /> */}      
      
     
      </main>

      <Footer
        locale={locale}
        dict={dict?.footer ?? {}}
      />
     
    </>
  );
}