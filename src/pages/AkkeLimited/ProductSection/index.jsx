function ProductSection() {
  return (
    <section className="akke-limited--product relative h-auto w-full bg-[#e1e1e1] pt-[10vh]">
      <div
        className="wrapper relative flex h-auto w-full flex-col items-start justify-start gap-0 md:grid md:gap-[2rem]"
        style={{
          gridTemplateColumns:
            "1fr calc(1150 * (100vh - (6rem + 5vh)) / 1440) 1fr",
        }}
      >
        <div className="product-left relative box-border h-auto w-full pt-[6rem] pr-[5vw] pl-[5vw] md:sticky md:top-[calc(6rem+10vh)] md:h-[calc(100vh-(6rem+5vh))] md:pt-0 md:pr-0">
          <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[3rem]">
            <div className="product-top relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
              <div className="product-title desktop relative w-full">
                <h1 className="font-humane leading-full text-[15vw] text-[#93A7A8] uppercase md:text-[8vw]">
                  Everest
                </h1>
              </div>
            </div>
            {[
              {
                title: "",
                items: [
                  "Struttura in mezza maglia inglese",
                  "Capo double face",
                  "Bandierina logo “AKKE” double face",
                  "Collo vulcano con calature a vista",
                  "8 fili di lana e cordura 2-48 mixati a 4 fili di puro cashmere 2-28",
                ],
              },
              {
                title: "Materiali e cura",
                items: ["50% Cashmere", "30% Lana", "20% Cordura"],
              },
            ].map((detail, index) => (
              <div
                key={index}
                className="product-details desktop relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex"
              >
                <span className="leading-full text-base font-bold text-[#1d1d1d] uppercase">
                  {detail.title}
                </span>
                <ul className="relative flex h-auto w-full flex-col">
                  {detail.items.map((text, index) => (
                    <li
                      key={index}
                      className="relative flex items-start justify-start gap-[0.3rem] text-base leading-[1.2rem] text-[#1d1d1d] before:text-[1.5rem] before:leading-[1rem] before:content-['·']"
                    >
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="product-heat desktop relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex">
              <span className="leading-full text-base font-bold text-[#1d1d1d] uppercase">
                Calore
              </span>
              <div className="circles relative flex h-auto w-full items-center justify-start gap-[0.25rem]">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="relative box-border flex h-4 w-4 items-center justify-center rounded-full border border-[#93A7A8] after:h-3 after:w-3 after:rounded-full after:bg-[#93A7A8] after:content-['']"
                  />
                ))}
                <div className="circle_plus">
                  <span className="leading-full flex items-center justify-center text-base font-bold text-[#1d1d1d] uppercase">
                    +
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-middle relative h-auto w-full"></div>
        <div className="product-right relative box-border h-auto px-[5vw] py-[2rem] md:sticky md:top-[calc(6rem+10vh)] md:h-[calc(100vh-(6rem+5vh))] md:p-0">
          <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[3.75rem]">
            <div className="product-top">
              <div className="product-title limited mobile relative flex h-auto w-full flex-col items-start justify-start gap-[2rem] md:gap-[3rem]">
                <h1 className="my-[1.5rem] text-[2rem] leading-[3rem]">
                  Everest
                </h1>
              </div>
              <div className="product-price relative flex h-auto w-full items-center justify-between">
                <div className="left relative flex h-auto w-auto flex-col items-start justify-end">
                  <span className="regular leading-full text-[2rem] text-[#1d1d1d]">
                    € 850.00
                  </span>
                </div>
              </div>
              <div className="product-colors-variations relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
                <span className="leading-full relative flex h-auto w-full items-center justify-start gap-[0.5rem] text-base font-bold text-[#1d1d1d] uppercase">
                  Colore<em>Natural/Taupe</em>
                </span>
                <div className="col-list relative flex h-auto w-full items-center justify-start gap-[1rem]">
                  <div className="product-color current relative box-border flex h-[3rem] w-[3rem] items-center justify-center rounded-full border-2 border-[#c1bab7] bg-[#c1bab7] lg:h-[4rem] lg:w-[4rem]">
                    <div className="inner h-[2.5rem] w-[2.5rem] rounded-full bg-[#c1bab7] lg:h-[3.25rem] lg:w-[3.25rem]"></div>
                  </div>
                </div>
              </div>
              <div className="product-variations">
                <div className="top">
                  <span className="label">Taglia</span>
                  <div className="sizes-guide-btn">
                    <span>Guida taglie</span>
                  </div>
                </div>
                <div className="row">
                  <div className="variations-list limited">
                    <div data-variation-id="743" className="item">
                      <div className="inner">S</div>
                    </div>
                    <div data-variation-id="744" className="item">
                      <div className="inner">M</div>
                    </div>
                    <div data-variation-id="745" className="item">
                      <div className="inner">L</div>
                    </div>
                    <div data-variation-id="746" className="item">
                      <div className="inner">XL</div>
                    </div>
                    <div data-variation-id="747" className="item">
                      <div className="inner">XXL</div>
                    </div>{" "}
                  </div>
                </div>
              </div>
              <div className="product-description">
                <p>
                  Tiratura limitata di 100 pezzi al mondo. Questo capo double
                  face è realizzato con 8 fili di lana/cordura nel colore
                  natural (lato A), combinati a 4 fili di puro cashmere nel
                  colore taupe (lato B).
                </p>
              </div>
            </div>
            <div className="product-bottom">
              <div className="product-button">
                <div
                  className="custom-button bg-orange text-big disabled limited h-6 w-full rounded"
                  id="add2cart"
                >
                  <span>Aggiungi al carrello</span>
                </div>
              </div>
              <div className="row-buttons">
                <div className="shippingReturns">
                  <a href="https://akkeknitwear.com/everest-akke-limited/">
                    <span>Spedizioni e resi</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="product-details mobile">
              <span>Dettagli</span>
              <ul>
                <li className="p1">Struttura in mezza maglia inglese</li>
                <li className="p1">Capo double face</li>
                <li className="p1">Bandierina logo “AKKE” double face</li>
                <li className="p1">Collo vulcano con calature a vista</li>
                <li className="p1">
                  8 fili di lana e cordura 2-48 mixati a 4 fili di puro cashmere
                  2-28
                </li>
              </ul>
            </div>
            <div className="product-materials mobile">
              <span>Materiali e cura</span>
              <ul>
                <li>50% Cashmere</li>
                <li>30% Lana</li>
                <li>20% Cordura</li>
              </ul>
              <div className="icons"></div>
            </div>
            <div className="product-heat limited mobile">
              <span>Calore</span>
              <div className="circles">
                <div className="circle full"></div>
                <div className="circle full"></div>
                <div className="circle full"></div>
                <div className="circle full"></div>
                <div className="circle full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
