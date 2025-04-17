import Footer from "../../components/organisms/footer/Footer";
import ScrollCircle from "../../components/others/ScrollCircle";
import Limited from "./Limited";
import ProductList from "./ProductList";
import Roadmap from "./Roadmap";
import { SliderSection } from "./SliderSection";

function HomePage() {
  return (
    <main className="block bg-black">
      <div className="overflow-hidden">
        <SliderSection />
        <Roadmap />
        <ProductList />
        <Limited />
        <Footer />
        <ScrollCircle />
      </div>
    </main>
  );
}

export default HomePage;
