import FeaturesSection from "./FeaturesSection";
import FeaturesVideo from "../../assets/features.mp4";
import AdvSection from "./AdvSection";
import DecryptedText from "../../components/animations/DecryptedText";
import { ImagesSection } from "../AkkeLimited/ImagesSection";
import { useGSAPAnimation } from "../../hooks/useGSAPAnimation";

function AkkeWorld() {
  useGSAPAnimation();

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
          leftImage:
            "https://akkeknitwear.com/website/wp-content/uploads/2025/03/world-1.jpg",
          rightTitle: "Durable and timeless",
          rightImage:
            "https://akkeknitwear.com/website/wp-content/uploads/2025/03/world-2.jpg",
        }}
        blockFull={{
          image:
            "https://akkeknitwear.com/website/wp-content/uploads/2025/03/banner2.jpg",
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
