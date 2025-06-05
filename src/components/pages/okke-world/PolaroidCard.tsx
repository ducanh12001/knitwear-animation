import { forwardRef, type Ref } from 'react';
import type { Polaroid } from '@/pages/OkkeWorld/AdvSection';

interface PolaroidCardProps {
  polaroid: Polaroid;
  index: number;
}

const PolaroidCard = forwardRef<HTMLDivElement, PolaroidCardProps>(
  ({ polaroid, index }, ref: Ref<HTMLDivElement>) => (
    <div
      ref={ref}
      className="polaroid absolute box-border h-auto w-[18vw] scale-80 rotate-0 bg-white px-[1vw] pt-[1vw] pb-[3.5vw] opacity-0 shadow-lg"
      style={{
        top: polaroid.position.top,
        left: polaroid.position.left,
      }}
      data-order={index}
    >
      <div className="relative h-auto w-full">
        <img
          className="block h-auto w-full object-cover"
          src={polaroid.image}
          alt={polaroid.alt}
          loading="lazy"
        />
        <span
          className="font-permanent-marker leading-full text-primary absolute -bottom-[1.75vw] translate-y-1/2 text-[2rem]"
          style={{
            left: polaroid.labelPosition.left,
            right: polaroid.labelPosition.right,
          }}
        >
          {polaroid.label}
        </span>
      </div>
    </div>
  ),
);

export default PolaroidCard;
