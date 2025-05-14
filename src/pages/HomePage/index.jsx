import { useGSAPAnimation } from "../../hooks/useGSAPAnimation";
import Limited from "./Limited";
import ProductList from "./ProductList";
import Roadmap from "./Roadmap";
import { SliderSection } from "./SliderSection";

function HomePage() {
  useGSAPAnimation();

  return (
    <div className="homepage overflow-hidden">
      <SliderSection />
      <Roadmap />
      <ProductList />
      <Limited />
    </div>
  );
}

export default HomePage;
