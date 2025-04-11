export function ProductCard({ product }) {
  return (
    <div
      className="product-card relative w-full h-auto"
      data-id={product.id}
      data-url={product.url}
    >
      <div className="relative w-full h-full">
        <a
          href={product.url}
          className="relative w-full h-full flex flex-col gap-8"
        >
          <div className="relative w-full h-auto">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto block"
            />
          </div>
          <div className="relative w-full h-full flex flex-col items-start justify-between grow gap-4">
            <div className="relative w-full h-auto flex flex-col justify-center items-center text-center gap-4">
              <div className="flex flex-col justify-center items-center gap-4">
                <h3 className="text-5xl text-[#302F35] font-semibold uppercase">
                  {product.title}
                </h3>
                <div className="relative h-4 flex gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      data-product={color.id}
                    />
                  ))}
                </div>
              </div>
              <div className="relative w-[80%] text-sm text-[#1d1d1d]">
                <p>{product.description}</p>
              </div>
            </div>
            <div className="relative w-full h-auto">
              <div className="w-full h-auto flex flex-col justify-end items-center">
                <span className="line-through text-[#FD7453]">
                  {product.price.regular}
                </span>
                <span className="text-2xl text-[#1d1d1d] font-bold">
                  {product.price.sale}
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
