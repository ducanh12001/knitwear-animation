import { useEffect, useRef } from "react";
import { ProductCard } from "./ProductCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProductList() {
  const menRef = useRef(null);
  const womenRef = useRef(null);

  const menProducts = [
    {
      id: 452,
      url: "https://akkeknitwear.com/prodotto/indrasan-mf2415gc1-acid-lime/",
      title: "Indrasan",
      image:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2415GC1_AcidLime_1-2-960x1202.jpg",
      description: "Girocollo manica lunga con logo",
      price: { regular: "€ 218.00", sale: "€ 109.00" },
      colors: [
        { id: 452, hex: "#b9cb5f", active: true },
        { id: 2377, hex: "#003b84", active: false },
        { id: 425, hex: "#d4ccc8", active: false },
      ],
    },
    {
      id: 1071,
      url: "https://akkeknitwear.com/prodotto/cho-oyu-mf2408scarf4-very-peri/",
      title: "Cho Oyu",
      image:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2408SCARF4_Veryperri_1-2-960x1202.jpg",
      description: "Sciarpa mezza maglia inglese con logo",
      price: { regular: "€ 125.00", sale: "€ 62.50" },
      colors: [
        { id: 1071, hex: "#324fad", active: true },
        { id: 1076, hex: "#2d2c2f", active: false },
        { id: 1075, hex: "#b9cb5f", active: false },
        { id: 1074, hex: "#d4ccc8", active: false },
      ],
    },
    {
      id: 2356,
      url: "https://akkeknitwear.com/prodotto/annapurna/",
      title: "Annapurna",
      image:
        "https://akkeknitwear.com/website/wp-content/uploads/2024/09/ANNAPURNA-RED-ROCK-960x1202.jpg",
      description: "",
      price: { regular: "€ 260.00", sale: "€ 130.00" },
      colors: [
        { id: 2356, hex: "#a0522d", active: true },
        { id: 897, hex: "#2d2c2f", active: false },
        { id: 886, hex: "#d4ccc8", active: false },
      ],
    },
    {
      id: 181,
      url: "https://akkeknitwear.com/prodotto/trisul-mf2418gc1-asphalt/",
      title: "Trisul",
      image:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2418GC1_Asphalt_1-960x1202.jpg",
      description: "T-shirt manica corta traspirabile",
      price: { regular: "€ 165.00", sale: "€ 82.00" },
      colors: [
        { id: 181, hex: "#2d2c2f", active: true },
        { id: 160, hex: "#b9cb5f", active: false },
        { id: 140, hex: "#d4ccc8", active: false },
        { id: 128, hex: "#324fad", active: false },
      ],
    },
  ];

  const womenProducts = [
    {
      id: 219,
      url: "https://akkeknitwear.com/prodotto/trisul-wf2418gc1-asphalt/",
      title: "Trisul",
      image:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/11/WF2418GC1_Asphalt_1-960x1202.jpg",
      description: "T-shirt manica corta traspirabile",
      price: { regular: "€ 165.00", sale: "€ 82.00" },
      colors: [
        { id: 219, hex: "#2d2c2f", active: true },
        { id: 214, hex: "#b9cb5f", active: false },
        { id: 209, hex: "#d4ccc8", active: false },
        { id: 195, hex: "#324fad", active: false },
      ],
    },
    {
      id: 582,
      url: "https://akkeknitwear.com/prodotto/kang-taiga-wf2415dr6-very-peri/",
      title: "Kang Taiga",
      image:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/11/WF2415DR6_Veryperri_1-1-960x1202.jpg",
      description: "Abito manica lunga con asola per pollice",
      price: { regular: "€ 202.00", sale: "€ 101.00" },
      colors: [
        { id: 582, hex: "#324fad", active: true },
        { id: 562, hex: "#2d2c2f", active: false },
      ],
    },
    {
      id: 592,
      url: "https://akkeknitwear.com/prodotto/namcha-barwa-wf2415gc7-turtle-dove/",
      title: "Namcha Barwa",
      image:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/11/WF2415GC7_Turtledove_1-1-960x1202.jpg",
      description: "Girocollo crop manica lunga con logo patch",
      price: { regular: "€ 183.00", sale: "€ 91.00" },
      colors: [
        { id: 592, hex: "#d4ccc8", active: true },
        { id: 599, hex: "#2d2c2f", active: false },
        { id: 587, hex: "#324fad", active: false },
      ],
    },
    {
      id: 838,
      url: "https://akkeknitwear.com/prodotto/k2-wf2407ho5-acid-lime/",
      title: "K2",
      image:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/11/WF2407HO5_AcidLime_1-1-960x1202.jpg",
      description: "Felpa manica lunga con cappuccio",
      price: { regular: "€ 244.00", sale: "€ 122.00" },
      colors: [
        { id: 838, hex: "#b9cb5f", active: true },
        { id: 847, hex: "#2d2c2f", active: false },
        { id: 822, hex: "#324fad", active: false },
      ],
    },
  ];

  useEffect(() => {
    // Animation cho tiêu đề "Men best seller"
    gsap.fromTo(
      menRef.current.querySelector("h2"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: menRef.current.querySelector("h2"),
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation cho các product card trong "Men best seller"
    gsap.fromTo(
      menRef.current.querySelectorAll(".grid > div"),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: menRef.current.querySelector(".grid"),
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation cho tiêu đề "Women best seller"
    gsap.fromTo(
      womenRef.current.querySelector("h2"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: womenRef.current.querySelector("h2"),
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation cho các product card trong "Women best seller"
    gsap.fromTo(
      womenRef.current.querySelectorAll(".grid > div"),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: womenRef.current.querySelector(".grid"),
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section className="relative w-full h-auto bg-[#e1e1e1] py-[10vh] px-[5vw]">
      <div className="relative w-full h-auto flex flex-col justify-start items-start gap-[15vh]">
        <div
          ref={menRef}
          className="relative w-full h-auto flex flex-col justify-start items-center"
        >
          <h2 className="men-list-title text-6xl text-[#302F35] font-bold uppercase mb-8">
            Men best seller
          </h2>
          <div className="relative w-full h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {menProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div
          ref={womenRef}
          className="relative w-full h-auto flex flex-col justify-start items-center"
        >
          <h2 className="women-list-title text-6xl text-[#302F35] font-bold uppercase mb-8">
            Women best seller
          </h2>
          <div className="relative w-full h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {womenProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
