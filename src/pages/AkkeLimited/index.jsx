import ImagesSection from "./ImagesSection/index.jsx";
import { IntroSection } from "./IntroSection";
import ProductSection from "./ProductSection/index.jsx";

function AkkeLimited() {
  return (
    <div className="page-akkelimited bg-[#93A7A8]">
      <IntroSection />
      <ImagesSection
        blockTop={{
          title: "Everest AKKE Limited",
          des: "EVEREST è una creazione esclusiva AKKE con una doppia anima. Da una parte il blend di lana e cordura in una colorazione neutra e dall’altra puro cashmere in una nuance taupé",
        }}
        blockColumns={{
          leftTitle: "Only 100 Items",
          leftImage:
            "https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-2-600x800.webp",
          rightTitle: "Double Face",
          rightImage:
            "https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-3-600x800.webp",
        }}
        blockFull={{
          image:
            "https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-4-1440x720.webp",
          des: "Un maglione double face che chiede di diventare parte integrante del tuo abbigliamento tecnico, regalandoti adattabilità, resistenza e durevolezza, ma anche un capo che entra nella quotidianità con la sua traspirabilità, la sua leggerezza e indiscusse qualità estetiche.",
        }}
      />
      <ProductSection />
    </div>
  );
}

export default AkkeLimited;
