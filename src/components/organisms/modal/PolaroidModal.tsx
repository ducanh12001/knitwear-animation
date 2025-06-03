import { CloseButton } from '@/components/atoms/buttons/CloseButton';
import type { Polaroid } from '@/pages/AkkeWorld/AdvSection';
import React, { type FC } from 'react';

interface PolaroidDataProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
  modalBgRef: React.RefObject<HTMLDivElement | null>;
  modalContentRef: React.RefObject<HTMLDivElement | null>;
  memoizedPolaroids: Polaroid[];
  selectedPolaroid: number;
  closeModal: () => void;
}

const PolaroidModal: FC<PolaroidDataProps> = ({
  modalRef,
  modalBgRef,
  modalContentRef,
  memoizedPolaroids,
  selectedPolaroid,
  closeModal,
}) => {
  const selectedPolaroidData = memoizedPolaroids[selectedPolaroid];

  return (
    <div
      ref={modalRef}
      className="custom-modal mobile invisible fixed top-0 left-0 z-[999] h-full w-full opacity-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="polaroid-modal-title"
    >
      <div
        ref={modalBgRef}
        className="modal-bg bg-primary/85 absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
        onClick={closeModal}
        aria-label="Close modal"
      />
      <div
        ref={modalContentRef}
        className="modal-zoom invisible absolute top-1/2 left-1/2 h-auto w-[90%] -translate-x-1/2 -translate-y-1/2 scale-60 rounded-lg bg-white opacity-0 shadow-xl md:w-[50vw]"
      >
        <div className="modal-close absolute top-auto right-4 bottom-4 z-[45]">
          <CloseButton onClick={closeModal} aria-label="Close polaroid view" />
        </div>
        <div className="relative box-border h-auto w-full px-[2vw] pt-[2vw] pb-[5rem]">
          <div className="relative flex h-auto w-full flex-col items-start justify-start gap-4">
            <div className="relative h-auto w-full">
              <img
                src={selectedPolaroidData.image}
                alt={selectedPolaroidData.alt}
                className="block h-auto w-full rounded object-cover"
                loading="lazy"
              />
              <span
                id="polaroid-modal-title"
                className="font-permanent-marker leading-full text-primary absolute -bottom-[2.5rem] left-0 translate-y-1/2 text-[2rem]"
              >
                {selectedPolaroidData.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolaroidModal;
