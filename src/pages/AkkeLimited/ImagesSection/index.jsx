function ImagesSection() {
  return (
    <div className="relative h-auto w-full pt-[15vh]">
      <div className="relative flex h-auto w-full flex-col items-start justify-start">
        <div className="block-top relative box-border flex h-auto w-full items-start justify-center px-[10vw]">
          <div className="relative flex w-auto flex-col items-start justify-start gap-[5vw]">
            <h2 className="font-humane text-[15vw] leading-[75%] text-[#1d1d1d] uppercase">
              Everest AKKE Limited
            </h2>
            <div className="relative flex w-[90%] flex-col items-start justify-start">
              <p className="relative w-auto text-[3vw] leading-[120%] text-white">
                EVEREST è una creazione esclusiva AKKE con una doppia anima. Da
                una parte il blend di lana e cordura in una colorazione neutra e
                dall’altra puro cashmere in una nuance taupé
              </p>
            </div>
          </div>
        </div>
        <div className="block-columns relative box-border grid h-auto w-full grid-cols-2 px-[5vw] pt-[10vw] pb-[15vw]">
          <div className="left relative box-border flex h-auto w-full flex-col items-start justify-start pl-0 md:pl-[10%]">
            <h3 className="font-humane absolute top-[12vw] left-[15%] z-12 h-auto w-1/2 text-[60px] leading-[75%] text-white uppercase md:text-[90px]">
              Only 100 Items
            </h3>
            <div className="relative z-10 flex w-[95%] flex-col md:w-[80%]">
              <div className="relative translate-y-[25vw]">
                <div>
                  <img
                    className="block h-auto w-full"
                    src="https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-2-600x800.webp"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right relative box-border flex h-auto w-full flex-col items-end justify-start md:pr-[10%]">
            <div className="relative z-10 flex w-[95%] flex-col md:w-[80%]">
              <div className="relative">
                <div>
                  <img
                    className="block h-auto w-full"
                    src="https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-3-600x800.webp"
                  />
                </div>
              </div>
            </div>
            <h3 className="font-humane absolute -right-[5vw] -bottom-[5vw] z-12 h-auto w-1/2 text-[60px] leading-[75%] text-white uppercase md:text-[90px]">
              Double Face
            </h3>
          </div>
        </div>
        <div className="block-full relative h-auto w-full">
          <div className="relative h-auto w-full">
            <img
              className="block h-auto w-full"
              src="https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-4-1440x720.webp"
            />
          </div>
          <div className="relative box-border grid w-full px-[5vw] py-[5rem] md:py-[10vw]">
            <p className="relative w-full text-[20px] leading-[120%] text-white">
              Un maglione double face che chiede di diventare parte integrante
              del tuo abbigliamento tecnico, regalandoti adattabilità,
              resistenza e durevolezza, ma anche un capo che entra nella
              quotidianità con la sua traspirabilità, la sua leggerezza e
              indiscusse qualità estetiche.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagesSection;
