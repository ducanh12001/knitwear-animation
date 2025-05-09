import React, { useEffect } from "react";
import ImagesSection from "../AkkeLimited/ImagesSection";
import FeaturesSection from "./FeaturesSection";
import FeaturesVideo from "../../assets/features.mp4";
import AdvSection from "./AdvSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecryptedText from "../../components/animations/DecryptedText";

gsap.registerPlugin(ScrollTrigger);

function AkkeWorld() {
  useEffect(() => {
    const elements = document.querySelectorAll(".page-akkeworld .elAnimation");

    const path = document.querySelector(".page-akkeworld .road .street");
    const roadG = document.querySelectorAll(".page-akkeworld .road svg g");

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
        case "scrumbleText":
          gsap.to(el, {
            autoAlpha: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
          break;
        case "road":
          path.style.strokeDasharray = `${path.getTotalLength()} ${path.getTotalLength()}`;
          path.style.strokeDashoffset = path.getTotalLength().toString();
          gsap.fromTo(
            path,
            { strokeDashoffset: path.getTotalLength() },
            {
              strokeDashoffset: 0,
              duration: 7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            },
          );
          roadG.forEach((item, index) => {
            gsap.to(item, {
              autoAlpha: 1,
              duration: 2,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              delay: 1 + index * 0.2,
            });
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
    <div className="page-akkeworld">
      <section className="relative h-auto w-full md:h-screen">
        <div className="desktop relative h-full w-full">
          <img
            className="block h-full w-full object-cover object-center"
            src="https://akkeknitwear.com/website/wp-content/uploads/2025/03/bannerworld.jpg"
            alt=""
          />
        </div>
        <div className="mobile relative h-full w-full">
          <img
            className="block h-full w-full object-cover object-center"
            src="https://akkeknitwear.com/website/wp-content/uploads/2025/03/bannerworld-mob.jpg"
            alt=""
          />
        </div>
      </section>
      <ImagesSection
        bgColor="#A9AFA4"
        blockTop={{
          title: "The epitome of italian excellence",
          des: "AKKE transforms high-performance technical fibers into luxurious garments, knitting a 3D future that embraces craftsmanship and extraordinary functionality. All of our garments are meticulously crafted to welcome your body.",
        }}
        blockColumns={{
          leftTitle: "Research and experiment",
          leftImage: "https://akkeknitwear.com/website/wp-content/uploads/2025/03/world-1.jpg",
          rightTitle: "Durable and timeless",
          rightImage: "https://akkeknitwear.com/website/wp-content/uploads/2025/03/world-2.jpg",
        }}
        blockFull={{
          image: "https://akkeknitwear.com/website/wp-content/uploads/2025/03/banner2.jpg",
          des: "The innovation of materials and the study of details push AKKE knitwear beyond the boundaries of the ordinary.",
          des2: "We want to inspire those who are looking for something more, those who want to experience the unlimited potential of textile creations.",
        }}
      />
      <FeaturesSection />
      <section className="akkeworld--video relative box-border h-auto w-full bg-black p-8 md:px-[10vw] md:py-[10vh]">
        <div className="elAnimation" animation="clip-top-to-bottom">
          <video src={FeaturesVideo} controls />
        </div>
      </section>
      <section className="akkeworld--image-full relative h-auto w-full">
        <div className="wrapper relative h-auto w-full">
          <div className="image relative z-10 h-auto w-full">
            <img
              src="https://akkeknitwear.com/website/wp-content/uploads/2025/03/full.jpg"
              alt=""
              className="block h-auto w-full"
            />
          </div>
          <div className="title absolute top-1/2 left-1/2 z-15 -translate-1/2">
            <h2 className="font-humane text-[90px] leading-[75%] whitespace-nowrap text-white uppercase md:text-[12vw]">
              <DecryptedText
                text="42°54’21.60” N 13°11’42.00”E"
                animateOn="view"
                revealDirection="center"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                maxIterations={30}
              />
            </h2>
          </div>
          <div
            className="gradient absolute top-0 left-0 z-50 h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(0deg, #1d1d1d 0%, rgba(29, 29, 29, 0) 26%, rgba(29, 29, 29, 0) 100%)",
            }}
          />
        </div>
      </section>
      <AdvSection />
    </div>
  );
}

export default AkkeWorld;
