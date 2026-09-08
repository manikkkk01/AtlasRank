import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import FeatureSection from "../components/home/FeatureSection";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-white">

      <main>
        <Hero />
        <HowItWorks />
        <FeatureSection />
        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default Home;