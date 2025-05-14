import { IntroSection } from "./IntroSection";
import { useMediaQuery } from "react-responsive";
import { ProductSection } from "../../components/pages/product-detail/ProductSection.jsx";
import { ImagesSection } from "./ImagesSection.jsx";
import { useGSAPAnimation } from "../../hooks/useGSAPAnimation.js";

function AkkeLimited() {
  const isSP = useMediaQuery({
    query: "(width < 768px)",
  });

  useGSAPAnimation();

  return (
    <div className="page-akkelimited bg-[#93A7A8]">
      <IntroSection isSP={isSP} />
      <ImagesSection
        blockTop={{
          title: "Everest AKKE Limited",
          des: "EVEREST è una creazione esclusiva AKKE con una doppia anima. Da una parte il blend di lana e cordura in una colorazione neutra e dall’altra puro cashmere in una nuance taupé",
        }}
        blockColumns={{
          leftTitle: "Only 100 Items",
          leftImage:
            "https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-2.jpg",
          rightTitle: "Double Face",
          rightImage:
            "https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-3.jpg",
        }}
        blockFull={{
          image:
            "https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-4.jpg",
          des: "Un maglione double face che chiede di diventare parte integrante del tuo abbigliamento tecnico, regalandoti adattabilità, resistenza e durevolezza, ma anche un capo che entra nella quotidianità con la sua traspirabilità, la sua leggerezza e indiscusse qualità estetiche.",
        }}
      />
      <ProductSection
        product={{
          title: "Everest",
          price: { regular: "€ 850.00" },
          colors: [{ hex: "#c1bab7", active: true }],
          description:
            "Production limited to 100 items worldwide. This reversible garment is created using 8 strands of wool/Cordura in a natural colour (side A), combined with 4 strands of pure cashmere in taupe (side B).",
        }}
        themeColor="#93A7A8"
        hoverColor="#82999a"
        sectionClass="bg-[#e1e1e1] pt-[10vh]"
      />
    </div>
  );
}

export default AkkeLimited;
