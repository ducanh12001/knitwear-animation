import {
  menProducts,
  womenProducts,
} from '@/constant/mock-datas/sampleProductList';
import ProductCard from '@/pages/HomePage/ProductList/ProductCard';

const FILTER_ITEMS = [
  {
    label: 'View all',
    href: '/product-category/menswear-collection',
  },
  {
    label: 'Polo',
    href: '/product-category/menswear-collection',
  },
  {
    label: 'Hoodie',
    href: '/product-category/menswear-collection',
  },
  {
    label: 'Knitwear',
    href: '/product-category/menswear-collection',
  },
  {
    label: 'Joggers',
    href: '/product-category/menswear-collection',
  },
  {
    label: 'T-shirt',
    href: '/product-category/menswear-collection',
  },
  {
    label: 'Accessories',
    href: '/product-category/menswear-collection',
  },
];

interface ProductCollectionProps {
  isMen: boolean;
}

const ProductCollection = ({ isMen }: ProductCollectionProps) => {
  return (
    <section className="relative box-border h-auto w-full px-[5vw] pt-[5rem] pb-[10vh] md:pt-[calc(6rem+5vh)]">
      <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[2.5rem] md:gap-[6rem]">
        <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[3rem]">
          <div className="relative flex h-auto w-full flex-col items-center justify-start pt-[5vh]">
            <h1 className="font-humane leading-full !text-[15vw] font-light uppercase">
              {isMen ? 'Menswear' : 'Womenswear'}
            </h1>
          </div>
          <div className="shop-filters relative flex h-auto w-full items-start justify-center">
            <ul className="relative flex flex-wrap items-center justify-center gap-3 md:gap-[1.5rem]">
              {FILTER_ITEMS.map((item, index) => (
                <li key={index} className="current-filter-item">
                  <a
                    key={index}
                    href={item.href}
                    className="relative box-border block h-auto w-full rounded-[25px] border border-solid border-[#302F35] px-[16px] py-0 hover:bg-[#302f3533] md:border-2 md:px-[3.5rem] md:py-[1rem]"
                    style={{
                      transition: 'background-color 0.35s ease-in-out 0s',
                    }}
                  >
                    <span className="leading-full text-primary text-base uppercase">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative h-auto w-full">
          <div className="relative grid h-auto w-full grid-cols-2 gap-x-0 gap-y-[8rem] md:grid-cols-4 md:gap-x-[2rem]">
            {(isMen ? menProducts : womenProducts).map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCollection;
