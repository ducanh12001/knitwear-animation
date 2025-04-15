import { useEffect, useRef } from "react";
import { ProductCard } from "./ProductCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  menProducts,
  womenProducts,
} from "../../../common/const/sampleProductList";

gsap.registerPlugin(ScrollTrigger);

function ProductList() {
  const menRef = useRef(null);
  const womenRef = useRef(null);

  useEffect(() => {
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
      },
    );

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
      },
    );

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
      },
    );

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
      },
    );
  }, []);

  return (
    <section className="relative h-auto w-full bg-[#e1e1e1] px-[5vw] py-[10vh]">
      <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[15vh]">
        <div
          ref={menRef}
          className="relative flex h-auto w-full flex-col items-center justify-start"
        >
          <h2 className="men-list-title font-humane text-h2 text-6xl font-light text-[#302F35] uppercase">
            Men best seller
          </h2>
          <div className="relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {menProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div
          ref={womenRef}
          className="relative flex h-auto w-full flex-col items-center justify-start"
        >
          <h2 className="women-list-title font-humane text-h2 text-6xl font-light text-[#A9AFA4] uppercase">
            Women best seller
          </h2>
          <div className="relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
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
