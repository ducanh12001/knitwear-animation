import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

function Limited() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     const section = sectionRef.current;
  //     const image = imageRef.current;
  //     const title = titleRef.current;

  //     if (!section || !image || !title) return;

  //     // Lấy kích thước và vị trí của section
  //     const rect = section.getBoundingClientRect();
  //     const isMouseInSection =
  //       e.clientX >= rect.left &&
  //       e.clientX <= rect.right &&
  //       e.clientY >= rect.top &&
  //       e.clientY <= rect.bottom;

  //     if (isMouseInSection) {
  //       const centerX = rect.left + rect.width / 2;
  //       const centerY = rect.top + rect.height / 2;

  //       // Tính khoảng cách từ con trỏ chuột đến trung tâm section
  //       const mouseX = e.clientX - centerX;
  //       const mouseY = e.clientY - centerY;

  //       // Tính tỷ lệ di chuyển dựa trên kích thước section
  //       const moveX = (mouseX / rect.width) * 50; // Di chuyển tối đa 50px
  //       const moveY = (mouseY / rect.height) * 50;

  //       // Áp dụng translate3d cho image-front (di chuyển cùng hướng chuột)
  //       image.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;

  //       // Áp dụng translate3d cho h2 (di chuyển ngược hướng chuột)
  //       title.style.transform = `translate3d(${-moveX}px, ${-moveY}px, 0)`;
  //     } else {
  //       // Nếu chuột ngoài section, đặt lại vị trí ban đầu
  //       image.style.transform = `translate3d(0, 0, 0)`;
  //       title.style.transform = `translate3d(0, 0, 0)`;
  //     }
  //   };

  //   // Thêm event listener
  //   window.addEventListener("mousemove", handleMouseMove);

  //   // Dọn dẹp
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

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
      <motion.div
        className="relative h-auto w-full"
        initial={{ opacity: 0, y: "10vh", scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <a href="https://akkeknitwear.com/everest-akke-limited/" className="relative block w-full">
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
          <div ref={imageRef} className="image-front desktop absolute top-0 left-0 h-auto w-full">
            <img
              src="https://akkeknitwear.com/website/wp-content/uploads/2023/10/AI_Immagine.png"
              className="w-full"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

export default Limited;
