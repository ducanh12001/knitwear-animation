import React from "react";

export default function AdvSection() {
  return (
    <section className="akkeworld--adv relative h-auto w-full bg-[#1d1d1d]">
      <div className="road absolute top-0 left-1/2 z-15 h-full -translate-x-1/2 xl:h-[60%]">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 680.7 2454.8"
          xml:space="preserve"
          className="relative block h-full w-auto"
        >
          <path
            className="street fill-none stroke-white stroke-2"
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
            d="M1,1c54.9,98.7,96.4,103.9,129.5,132.1s-4.4,60.2,52.7,83.4s19.8,30.1-8.1,85.1c-13.8,27.2,46.8,45,75,84
    s71.3,34.9,72.8,65.8s27,24,20.3,30.4c-19.1,18.2-133.9-21.6-115.6,0.6c32.9,40,96.6,17.6,58.1,60.1c-20,22.1-107.7,5.1-143.3,37.4
    S83.3,610,53.7,640.5C33,661.8,78,620.7,211.9,614.4c118.6-5.6,136.3-118.8,142.3-91.9s37.1,26.4,63.9,51.9
    c26.8,25.5,29.7,59.1,14.9,53.7c-14.9-5.4-28.2-3.6-44.6,17.7c-16.3,21.2-78.8-2.4-104,19.1s-98.1,143.7-53.5,88.7
    c44.6-55.1,124.2-48.3,155.4-64.5s66.6-46.5,76-14.5c9.8,33.5,23.4,23.5,55.4,35.9c102.5,39.6-140.8,44.2-155,138.4
    c-11.5,76.5-24.4,28.2-44.1,127.5c-23.1,117.1-163,194-182.4,268.7c-19.4,74.7,2.5,102.5-56.8,198.1
    c-59.3,95.6-92.3,256.3-70.8,187.7c19.8-62.9,130.1-142.5,146.9-248.5c12.5-78.6,29.8-92.2,77.5-147.2
    c16.6-19.1,45.6-59.6,45.6-94.3c0-42.2,56.1-86.1,72.4-125.1c47.8-114.2,14.3-218.4,93.3-89.8c28.5,46.3,61.7,54.7,54.3,69.5
    c-7.4,14.8,14.5,20.3,9.6,58.5c-4.9,38.2,10.7,21.7,6.6,46.1c-4.1,24.3-38.7,18.2-56,36.5c-17.3,18.2-80.7,8.7-104.5,36.5
    s-82.3,101.7-60.9,76.5s84-65.2,107-50.4c23,14.8,90.5-66,91.4-48.7c0.8,17.4,8.5-18.8,23.9,33.3c15.4,52.1,53.8,37,69.2,60.2
    c19.4,29.3-33-14.7-69.2,13.9c-16.2,12.8-75.7-9.3-92.2,8.1c-16.5,17.4-61.5,26.7-68,55.6s-68,15.1-70.2,40.6s-25.2,37.1-86.7,78.8
    c-61.5,41.7-5.5,16.2,66.9,1.2c72.4-15.1,62.6-12.7,99.9-71.8c37.3-59.1,86.7-32.4,86.7-52.1s39.4-17.7,65.9-31.3
    c45-23.2,43.7-32,96.6,16.2c33.6,30.6,73.5,19.7,63.7,44c-9.9,24.3-149.3,73-101,120.5c48.3,47.5,19.8,30.1-22,19.7
    s11-96.2,3.3-99.6c-7.7-3.5-68,47.5-97.7,67.2c-29.6,19.7-59.3-26.7-87.8-12.7c-28.5,13.9-97.7,35.9-133.9,45.2s-79-25.5-90,29
    c-11,54.4-25.2,60.2,6.4,15.1c31.7-45.2,19.9-9.3,57.3,6.9s96.5-31.3,134.9-34.9s5.5,55.7,28.5,41.8c23-13.9,54.9-46.3,103.2-27.8
    c48.3,18.5,65.8-22.8,102.1-10.4c14.8,5.1-51.6,40.6-51.6,52.1s-113,100.8-88.9,122.8s-76.8,64.9-90,97.3
    c-13.2,32.4-87.7,69.3-88.3,90.2c-1.8,68.3-88.4,53.9-120.3,161.6c-30,101.3-5.5,118.2-80.1,213.2c-2.2,2.8-4.5,5.8-6.7,8.9
    C20,2303.4,1,2364.6,1,2427.4v26.4"
            // style="stroke-dasharray: 9008.8, 9008.8; stroke-dashoffset: 0;"
          />
          {[
            { cx: 116.4, cy: 123 },
            { cx: 193.8, cy: 336.9 },
            { cx: 47.7, cy: 646.7 },
            { cx: 405.3, cy: 565 },
            { cx: 224, cy: 763.4 },
            { cx: 456.9, cy: 769.4 },
          ].map((point, index) => (
            <g key={index}>
              <circle
                className="z-10 border fill-none stroke-[#A9AFA4]"
                cx={point.cx}
                cy={point.cy}
                r="15.1"
                style={{
                  strokeMiterlimit: 10,
                  transition: "stroke 0.35s ease-in-out",
                  r: "24px",
                }}
              />
              <circle
                className="center z-4 fill-[#A9AFA4]"
                cx={point.cx}
                cy={point.cy}
                r="13.3"
                style={{ r: "16px", transition: "stroke 0.35s ease-in-out" }}
              />
              <circle
                className="before z-1 hidden fill-none stroke-[#A9AFA4] opacity-0 transition-opacity duration-350 ease-in-out"
                cx={point.cx}
                cy={point.cy}
                r="6"
                style={{ strokeOpacity: 0, r: "1.25vw" }}
              >
                <animate
                  attributeName="r"
                  begin="1.5s"
                  dur="1s"
                  values="1.25vw;1.875vw"
                  calcMode="cubic-bezier(0, 0.2, 0.8, 1)"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  begin="1.5s"
                  dur="1s"
                  values="1;0"
                  calcMode="cubic-bezier(0, 0.2, 0.8, 1)"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                className="after z-2 hidden fill-none stroke-[#A9AFA4] opacity-0 transition-opacity duration-350 ease-in-out"
                cx={point.cx}
                cy={point.cy}
                r="6"
                style={{ strokeOpacity: 0, r: "1.25vw" }}
              >
                <animate
                  attributeName="r"
                  begin="1.9s"
                  dur="1s"
                  values="1.25vw;1.875vw"
                  calcMode="cubic-bezier(0, 0.2, 0.8, 1)"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  begin="1.9s"
                  dur="1s"
                  values="1;0"
                  calcMode="cubic-bezier(0, 0.2, 0.8, 1)"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>
      </div>
      <div className="adv-section relative z-10 box-border flex h-auto w-full items-start justify-end px-[5vw] pt-[2.5rem] pb-[15rem] md:py-[25vh]">
        <div className="relative flex flex-col items-end justify-start gap-2 md:gap-8">
          <h2 className="font-humane text-[90px] leading-[75%] text-[#A9AFA4] uppercase md:text-[12vw]">
            ADV Campaign
          </h2>
          <h3 className="text-base leading-[75%] text-[#A9AFA4] uppercase md:text-[1.25rem]">
            Spring Summer 2025
          </h3>
        </div>
      </div>
      <div className="collections-section relative z-20 mt-[15v] box-border h-auto w-full px-[5vw] pt-0 pb-[15vh] md:mt-0 md:pt-[15vh]">
        <div className="relative flex h-auto w-full flex-col items-center justify-start">
          <h2 className="font-humane mb-[5vw] text-[90px] leading-[75%] text-[#A9AFA4] uppercase md:text-[12vw]">
            Explore AKKE Collections
          </h2>
          <div className="columns relative grid h-auto w-full grid-cols-2">
            <div className="column relative h-auto w-full">
              <div className="cat relative flex h-auto w-full items-start justify-center">
                <a className="relative block h-full w-[90%] md:w-[33vw]">
                  <div className="column-image relative z-10 h-auto w-full">
                    <div className="imageScale">
                      <div className="relative h-auto w-full transition-transform duration-1000 ease-in-out">
                        <img
                          src="https://akkeknitwear.com/website/wp-content/uploads/2025/03/uomo.webp"
                          className="block h-auto w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column-text absolute top-1/2 left-0 z-15 flex h-auto w-full -translate-y-1/2 flex-col items-center justify-center">
                    <h2 className="font-humane leading-full text-[70px] text-white uppercase md:text-[12vw]">
                      Menswear
                    </h2>
                  </div>
                </a>
              </div>
            </div>
            <div className="column relative h-auto w-full">
              <div className="cat relative mt-[15vh] flex h-auto w-full items-start justify-center">
                <a className="relative block h-full w-[90%] md:w-[33vw]">
                  <div className="column-image relative z-10 h-auto w-full">
                    <div className="imageScale">
                      <div className="relative h-auto w-full transition-transform duration-1000 ease-in-out">
                        <img
                          src="https://akkeknitwear.com/website/wp-content/uploads/2025/03/donna.webp"
                          className="h-atuo block w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column-text absolute top-1/2 left-0 z-15 flex h-auto w-full -translate-y-1/2 flex-col items-center justify-center">
                    <h2 className="font-humane leading-full text-[70px] text-white uppercase md:text-[12vw]">
                      Womenswear
                    </h2>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="columns2 relative mt-8 flex h-auto w-full items-start justify-center">
            <div className="column">
              <div className="cat relative flex h-auto w-full items-start justify-center">
                <a className="relative flex h-full w-auto items-center justify-center">
                  <div className="column-image relative z-10 h-auto w-[50vw] md:w-[33vw]">
                    <div className="imageScale">
                      <div className="relative h-auto w-full transition-transform duration-1000 ease-in-out">
                        <img
                          src="https://akkeknitwear.com/website/wp-content/uploads/2023/11/LIMITED.webp"
                          className="block h-auto w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column-text relative z-11 flex -translate-x-[5vw] flex-col items-end justify-center gap-2 whitespace-normal md:gap-0 md:whitespace-nowrap">
                    <h2 className="font-humane leading-full text-[70px] text-white uppercase md:text-[12vw]">
                      Everest Akke Limited
                    </h2>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-modal mobile invisible fixed top-0 left-0 z-999 h-full w-full opacity-0">
        <div className="modal-bg absolute top-0 left-0 h-full w-full bg-[#1d1d1d]/85 opacity-0" />
        <div className="modal-zoom invisible absolute top-1/2 left-1/2 h-auto w-[90%] -translate-1/2 scale-60 bg-white opacity-0 md:w-[50vw]">
          <div className="modal-close absolute top-auto right-4 bottom-4 z-45">
            <div className="close-cross relative h-5 w-5 cursor-pointer md:h-12 md:w-12">
              <div className="icon absolute top-1/2 left-1/2 h-[3px] w-full -translate-1/2 rotate-45 bg-[#1d1d1d]" />
              <div className="icon absolute top-1/2 left-1/2 h-[3px] w-full -translate-1/2 -rotate-45 bg-[#1d1d1d]" />
            </div>
          </div>
          <div className="relative box-border h-auto w-full px-[2vw] pt-[2vw] pb-[5vw]">
            <div className="relative flex h-auto w-full flex-col items-start justify-start gap-4">
              <div className="relative h-auto w-full">
                <img src="" alt="" className="block h-auto w-full" />
                <span className="font-permanent-marker leading-full absolute -bottom-[2.5rem] left-0 translate-y-1/2 text-[2rem] text-[#1d1d1d]">
                  {}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
