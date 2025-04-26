import React from "react";
import {
  menProducts,
  womenProducts,
} from "../../common/const/sampleProductList";
import { ProductCard } from "../HomePage/ProductList/ProductCard";

const FILTER_ITEMS = [
  {
    label: "View all",
    href: "https://akkeknitwear.com/categoria-prodotto/menswear/",
  },
  {
    label: "Polo",
    href: "https://akkeknitwear.com/categoria-prodotto/menswear/",
  },
  {
    label: "Hoodie",
    href: "https://akkeknitwear.com/categoria-prodotto/menswear/men-felpe/",
  },
  {
    label: "Knitwear",
    href: "https://akkeknitwear.com/categoria-prodotto/menswear/men-maglieria/",
  },
  {
    label: "Joggers",
    href: "https://akkeknitwear.com/categoria-prodotto/menswear/",
  },
  {
    label: "T-shirt",
    href: "https://akkeknitwear.com/categoria-prodotto/menswear/",
  },
  {
    label: "Accessories",
    href: "https://akkeknitwear.com/categoria-prodotto/menswear/",
  },
];

function ProductCollection({ isMen }) {
  return (
    <section className="shop-list relative box-border h-auto w-full px-[5vw] pt-[5rem] pb-[10vh] md:pt-[calc(6rem+5vh)]">
      <div className="wrapper relative flex h-auto w-full flex-col items-start justify-start gap-[2.5rem] md:gap-[6rem]">
        <div className="listing-info relative flex h-auto w-full flex-col items-start justify-start gap-[3rem]">
          <div className="shop-title relative flex h-auto w-full flex-col items-center justify-start pt-[5vh]">
            <h1 className="font-humane leading-full !text-[15vw] font-light uppercase">
              {isMen ? "Menswear" : "Womenswear"}
            </h1>
          </div>
          <div className="shop-filters relative flex h-auto w-full items-start justify-center">
            <ul className="relative flex flex-wrap items-center justify-center gap-3 md:gap-[1.5rem]">
              {FILTER_ITEMS.map((item, index) => (
                <li className="current-filter-item">
                  <a
                    key={index}
                    href={item.href}
                    className="relative box-border block h-auto w-full rounded-[25px] border border-solid border-[#302F35] px-[16px] py-0 hover:bg-[#302f3533] md:border-2 md:px-[3.5rem] md:py-[1rem]"
                    style={{
                      transition: "background-color 0.35s ease-in-out 0s",
                    }}
                  >
                    <span className="leading-full text-base text-[#1d1d1d] uppercase">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="list relative h-auto w-full">
          <div className="wrapper relative grid h-auto w-full grid-cols-2 gap-x-0 gap-y-[8rem] md:grid-cols-4 md:gap-x-[2rem]">
            {Array(10)
              .fill()
              .flatMap(() => (isMen ? menProducts : womenProducts))
              .map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={product} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCollection;
