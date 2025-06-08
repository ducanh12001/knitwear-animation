import { type FC } from 'react';
import { Link } from 'react-router';
import type { CollectionLinkType } from '@/pages/OkkeWorld/AdvSection';

interface CollectionLinkProps {
  collection: CollectionLinkType;
  isSpecial?: boolean;
}

const CollectionLink: FC<CollectionLinkProps> = ({
  collection,
  isSpecial = false,
}) => (
  <div
    className={`${isSpecial ? '' : 'relative h-auto w-full'} ${collection.className || ''}`}
  >
    <div className="relative flex h-auto w-full items-start justify-center">
      <Link
        to={collection.to}
        className={`relative ${isSpecial ? 'flex h-full w-auto items-center justify-center' : 'block h-full w-[90%] md:w-[33vw]'}`}
        aria-label={`Explore ${collection.title} collection`}
      >
        <div
          className={`elAnimation column-image relative z-10 h-auto ${isSpecial ? 'w-[50vw] md:w-[33vw]' : 'w-full'}`}
          data-animation="clip-top-to-bottom"
        >
          <div className="imageScale">
            <div className="relative h-auto w-full transition-transform duration-1000 ease-in-out">
              <img
                src={collection.image}
                alt={collection.alt}
                className="block h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col justify-center ${
            isSpecial
              ? 'relative z-11 -translate-x-[5vw] items-end gap-2 whitespace-normal md:gap-0 md:whitespace-nowrap'
              : 'absolute top-1/2 left-0 z-15 h-auto w-full -translate-y-1/2 items-center'
          }`}
        >
          <h2
            className="elAnimation font-humane leading-full text-[70px] text-white uppercase md:text-[12vw]"
            data-animation={
              isSpecial ? 'ease-right-to-left' : 'ease-bottom-to-top'
            }
          >
            {collection.title}
          </h2>
        </div>
      </Link>
    </div>
  </div>
);

export default CollectionLink;
