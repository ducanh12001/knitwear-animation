function ImagesSection({
  bgColor,
  blockTop = { title: "", des: "" },
  blockColumns = { leftTitle: "", leftImage: "", rightTitle: "", rightImage: "" },
  blockFull = { image: "", des: "", des2: "" },
}) {
  return (
    <section
      className="relative h-auto w-full pt-[5rem] md:pt-[15vh]"
      style={{ backgroundColor: bgColor || "inherit" }}
    >
      <div className="relative flex h-auto w-full flex-col items-start justify-start">
        <div className="block-top relative box-border flex h-auto w-full items-start justify-center px-[10vw]">
          <div className="relative flex w-auto flex-col items-start justify-start gap-[5vw]">
            <h2 className="font-humane text-[80px] leading-[75%] text-[#1d1d1d] uppercase md:text-[15vw]">
              {blockTop.title}
            </h2>
            <div className="relative flex w-[90%] flex-col items-start justify-start">
              <p className="relative w-auto text-[3vw] leading-[120%] text-white">{blockTop.des}</p>
            </div>
          </div>
        </div>
        <div className="block-columns relative box-border grid h-auto w-full grid-cols-2 px-[5vw] pt-[10vw] pb-[15vw]">
          <div className="left relative box-border flex h-auto w-full flex-col items-start justify-start pl-0 md:pl-[10%]">
            <h3 className="font-humane absolute top-[12vw] left-[15%] z-12 h-auto w-1/2 text-[60px] leading-[75%] text-white uppercase md:text-[90px]">
              {blockColumns.leftTitle}
            </h3>
            <div className="relative z-10 flex w-[95%] flex-col md:w-[80%]">
              <div className="relative translate-y-[25vw]">
                <div>
                  <img className="block h-auto w-full" src={blockColumns.leftImage} />
                </div>
              </div>
            </div>
          </div>
          <div className="right relative box-border flex h-auto w-full flex-col items-end justify-start md:pr-[10%]">
            <div className="relative z-10 flex w-[95%] flex-col md:w-[80%]">
              <div className="relative">
                <div>
                  <img className="block h-auto w-full" src={blockColumns.rightImage} />
                </div>
              </div>
            </div>
            <h3 className="font-humane absolute -right-[5vw] -bottom-[5vw] z-12 h-auto w-1/2 text-[60px] leading-[75%] text-white uppercase md:text-[90px]">
              {blockColumns.rightTitle}
            </h3>
          </div>
        </div>
        <div className="block-full relative h-auto w-full">
          <div className="relative h-auto w-full">
            <img className="block h-auto w-full" src={blockFull.image} />
          </div>
          <div className="relative box-border grid w-full px-[5vw] py-[5rem] md:py-[10vw]">
            <p className="relative w-full text-[20px] leading-[120%] text-white">{blockFull.des}</p>
            {blockFull.des2 && (
              <p className="relative w-full text-[20px] leading-[120%] text-[#302F35]">
                {blockFull.des2}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImagesSection;
