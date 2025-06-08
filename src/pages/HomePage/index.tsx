import { useGSAPAnimation } from '@/hooks/others/useGSAPAnimation';
import Limited from '@/pages/HomePage/Limited';
import ProductList from '@/pages/HomePage/ProductList';
import Roadmap from '@/pages/HomePage/Roadmap';
import { SliderSection } from '@/pages/HomePage/SliderSection';

const HomePage = () => {
  useGSAPAnimation();

  return (
    <div className="overflow-hidden">
      <SliderSection />
      <Roadmap />
      <ProductList />
      <Limited />
    </div>
  );
};

export default HomePage;
