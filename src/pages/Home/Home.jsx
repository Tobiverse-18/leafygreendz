import Hero from "./sections/Hero/Hero";
import "./Home.css";
import FeaturedBook from "./sections/FeaturedBook/FeaturedBook";
import BrandIntro from "./sections/BrandIntro/BrandIntro";
import BrandProcess from "./sections/BrandProcess/BrandProcess";
import Founder from "./sections/Founder/Founder";
import WhatWeCreate from "./sections/WhatWeCreate/WhatWeCreate";
import FinalCTA from "./sections/FinalCTA/FinalCTA";

function Home() {
  return (
    <div className="home">
      <Hero />
      <FeaturedBook />
      <BrandIntro />
      <BrandProcess />
      <Founder/>
      <WhatWeCreate/>
      <FinalCTA/>
    </div>
  );
}

export default Home;