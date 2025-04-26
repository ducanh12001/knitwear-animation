import Limited from "./Limited";
import ProductList from "./ProductList";
import Roadmap from "./Roadmap";
import { SliderSection } from "./SliderSection";

function HomePage() {
  return (
    <div className="overflow-hidden">
      <SliderSection />
      <Roadmap />
      <ProductList />
      <Limited />
    </div>
  );
}

export default HomePage;
