import { ProductCard } from "./ProductCard";
import {
  menProducts,
  womenProducts,
} from "../../../common/const/sampleProductList";

function ProductList() {
  return (
    <section className="relative h-auto w-full bg-[#e1e1e1] px-[5vw] py-[10vh]">
      <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[15vh]">
        <div className="relative flex h-auto w-full flex-col items-center justify-start">
          <h2
            className="elAnimation men-list-title font-humane text-[90px] font-light text-[#302F35] uppercase md:text-[15vw]"
            animation="ease-bottom-to-top"
          >
            Men best seller
          </h2>
          <div
            className="elAnimation relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4"
            animation="ease-stagger-list"
          >
            {menProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="relative flex h-auto w-full flex-col items-center justify-start">
          <h2
            className="elAnimation women-list-title font-humane text-6xl text-[90px] font-light text-[#A9AFA4] uppercase md:text-[15vw]"
            animation="ease-bottom-to-top"
          >
            Women best seller
          </h2>
          <div
            className="elAnimation relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4"
            animation="ease-stagger-list"
          >
            {womenProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
