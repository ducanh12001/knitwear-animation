import { useEffect } from "react";
import ImagesSection from "./ImagesSection/index.jsx";
import { IntroSection } from "./IntroSection";
import ProductSection from "./ProductSection/index.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

function AkkeLimited() {
  const isSP = useMediaQuery({
    query: "(width < 768px)",
  });

  useEffect(() => {
    const elements = document.querySelectorAll(".page-akkelimited .elAnimation");

    elements.forEach((el) => {
      const animationType = el.getAttribute("animation");
      switch (animationType) {
        case "ease-bottom-to-top":
          gsap.to(el, {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
          break;
        case "ease-left-to-right":
        case "ease-right-to-left":
          gsap.to(el, {
            x: 0,
            autoAlpha: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
          break;
        case "clip-top-to-bottom":
          gsap.to(el, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
          gsap.to(el.querySelector(".imageScale"), {
            scale: 1,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
          break;
        case "ease-bottom-to-top-scaled":
          gsap.to(el, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
          break;
        default:
          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
          break;
      }
    });
  }, []);

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
          leftImage: "https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-2.jpg",
          rightTitle: "Double Face",
          rightImage: "https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-3.jpg",
        }}
        blockFull={{
          image: "https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-4.jpg",
          des: "Un maglione double face che chiede di diventare parte integrante del tuo abbigliamento tecnico, regalandoti adattabilità, resistenza e durevolezza, ma anche un capo che entra nella quotidianità con la sua traspirabilità, la sua leggerezza e indiscusse qualità estetiche.",
        }}
      />
      <ProductSection />
    </div>
  );
}

export default AkkeLimited;
