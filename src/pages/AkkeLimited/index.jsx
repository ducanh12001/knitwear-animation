import ImagesSection from "./ImagesSection/index.jsx";
import { IntroSection } from "./IntroSection";
import ProductSection from "./ProductSection/index.jsx";

function AkkeLimited() {
  return (
    <div className="page-akkelimited bg-[#93A7A8]">
      <IntroSection />
      <ImagesSection />
      <ProductSection />
    </div>
  );
}

export default AkkeLimited;
