import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Link } from "react-router";

function Limited() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = sectionRef.current;
      const image = imageRef.current;
      const title = titleRef.current;

      if (!section || !image || !title) return;

      const rect = section.getBoundingClientRect();
      const isMouseInSection =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isMouseInSection) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const moveX = (mouseX / rect.width) * 50;
        const moveY = (mouseY / rect.height) * 50;

        gsap.to(image, {
          x: moveX,
          y: moveY,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(title, {
          x: -moveX,
          y: -moveY,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(image, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(title, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative box-border h-auto w-full">
      <div
        className="elAnimation relative h-auto w-full"
        animation="ease-bottom-to-top-scaled"
      >
        <Link to="/everest-akke-limited" className="relative block w-full">
          <div className="image-back mobile relative h-auto w-full">
            <img
              src="https://akkeknitwear.com/website/wp-content/uploads/2023/10/limited_home_without_man_mobile-blend.jpg"
              className="w-full"
            />
          </div>
          <div className="image-back desktop relative h-auto w-full">
            <img
              src="https://akkeknitwear.com/website/wp-content/uploads/2023/10/limited_home_without_man.jpg"
              className="w-full"
            />
          </div>
          <div className="title absolute top-1/2 left-1/2 -translate-1/2">
            <h2
              ref={titleRef}
              className="font-humane leading-full relative text-[20vw] font-medium whitespace-nowrap text-white uppercase"
            >
              Everest Akke Limited
            </h2>
          </div>
          <div
            ref={imageRef}
            className="image-front desktop absolute top-0 left-0 h-auto w-full"
          >
            <img
              src="https://akkeknitwear.com/website/wp-content/uploads/2023/10/AI_Immagine.png"
              className="w-full"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Limited;
