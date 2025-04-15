import { useState } from "react";

export function ProductCard({ product }) {
  const [hoveredColor, setHoveredColor] = useState(null);

  return (
    <div
      className="product-card relative h-auto w-full"
      data-id={product.id}
      data-url={product.url}
    >
      <div className="product-wrapper relative h-full w-full">
        <a
          href={product.url}
          className="group relative flex h-full w-full flex-col gap-8"
          onMouseLeave={() => setHoveredColor(null)}
        >
          <div className="product-image relative h-auto w-full">
            <img
              src={product.image}
              alt={product.title}
              className="block h-full w-full"
            />
            <div className="image-variant absolute top-0 left-0 h-auto w-full">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 h-auto w-full transition-opacity duration-300 ${
                    hoveredColor === color.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    key={index}
                    src={color.url}
                    alt={product.title}
                    className="block h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="product-info relative flex h-full w-full grow flex-col items-start justify-between gap-4">
            <div className="product-texts relative flex h-auto w-full flex-col items-center justify-start text-center">
              <div className="product-title relative">
                <h3 className="font-humane group-hover:visibility-hidden visibility-visible text-[3rem] font-normal text-[#302F35] uppercase opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0 md:text-[4vw]">
                  {product.title}
                </h3>
                <div className="product-colors absolute top-1/2 left-1/2 flex w-auto -translate-1/2 items-center justify-center gap-4 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
                      style={{ backgroundColor: color.hex }}
                      data-product={color.id}
                      onMouseEnter={() => setHoveredColor(color.id)}
                    />
                  ))}
                </div>
              </div>
              <div className="product-description relative w-[80%] text-base text-[#1d1d1d]">
                <p>{product.description}</p>
              </div>
            </div>
            <div className="product-price relative h-auto w-full">
              <div className="price group-hover:visibility-hidden visibility-visible flex h-auto w-full flex-col items-center justify-end opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
                <span className="text-[#FD7453] line-through">
                  {product.price.regular}
                </span>
                <span className="text-2xl font-bold text-[#1d1d1d]">
                  {product.price.sale}
                </span>
              </div>
              <div className="button absolute top-0 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                <div className="relative box-border rounded-3xl bg-[#1d1d1d] px-14 py-4">
                  <span className="text-xs whitespace-nowrap text-white uppercase">
                    Discover now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
