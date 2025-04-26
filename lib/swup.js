import Swup from "swup";
import SwupScrollPlugin from "@swup/scroll-plugin";
import SwupPreloadPlugin from "@swup/preload-plugin";
import { gsap } from "gsap";

export function initSwup(historyPush) {
  const swup = new Swup({
    containers: ["#swup"],
    plugins: [new SwupScrollPlugin(), new SwupPreloadPlugin()],
    doScrollingRightAway: true,
    animateHistoryBrowsing: true,
  });

  // Tắt tính năng tải nội dung của Swup
  swup.hooks.replace("content:replace", () => {
    // Không làm gì, để React Router xử lý render
  });

  // Hiệu ứng rời trang
  swup.hooks.on("animation:out:start", (visit) => {
    const pageTransition = document.querySelector("#pageTransition");
    const color1 = pageTransition.querySelector(".color-1");
    const color2 = pageTransition.querySelector(".color-2");
    const title = pageTransition.querySelector(".title h2");

    // title.textContent = visit.to.url.includes("menswear")
    //   ? "Menswear"
    //   : "Other";

    gsap.set(pageTransition, { opacity: 1, visibility: "inherit" });
    gsap.fromTo(
      color1,
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power2.out",
      },
    );
    gsap.fromTo(
      color2,
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      },
    );
    gsap.fromTo(
      title,
      { y: 10, opacity: 0, visibility: "hidden" },
      {
        y: 0,
        opacity: 1,
        visibility: "inherit",
        duration: 0.6,
        ease: "power2.out",
        delay: 1,
      },
    );
  });

  // Hiệu ứng vào trang
  swup.hooks.on("animation:in:start", () => {
    const pageTransition = document.querySelector("#pageTransition");
    const color1 = pageTransition.querySelector(".color-1");
    const color2 = pageTransition.querySelector(".color-2");
    const title = pageTransition.querySelector(".title h2");

    gsap.to(color2, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 0.8,
      ease: "power2.in",
    });
    gsap.to(color1, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 0.8,
      ease: "power2.in",
      delay: 0.2,
    });
    gsap.set(pageTransition, {
      opacity: 0,
      visibility: "hidden",
      delay: 1,
    });
    gsap.set(title, { y: -10, opacity: 0, visibility: "hidden" });
  });

  return swup;
}
