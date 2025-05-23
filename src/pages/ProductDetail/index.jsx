import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  menProducts,
  womenProducts,
} from "../../common/const/sampleProductList";
import { ProductCard } from "../HomePage/ProductList/ProductCard";
import { ProductSection } from "../../components/pages/product-detail/ProductSection";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (id) {
      const paramProduct = [...menProducts, ...womenProducts].find(
        (item) => item.id.toString() === id,
      );
      if (paramProduct) {
        setProduct(paramProduct);
      } else {
        console.error("Product not found");
      }
    }
  }, [id]);

  return (
    <>
      <ProductSection
        productId={id}
        product={product}
        themeColor="#FD7453"
        hoverColor="#FD5932"
        sectionClass=""
      />
      <section className="product--related-section relative box-border h-auto w-full p-[5vw]">
        <div className="relative flex h-auto w-full flex-col items-start justify-start">
          <h2 className="font-humane leading-full mb-[5vh] text-[15vw] text-[#FD7453] md:text-[8vw]">
            You may like it
          </h2>
          <div className="list relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-4">
            {menProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
