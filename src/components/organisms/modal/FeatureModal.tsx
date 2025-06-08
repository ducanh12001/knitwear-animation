import { type FC, type RefObject } from 'react';
import { CloseButton } from '@/components/atoms/buttons/CloseButton';
import { FEATURES_DATA } from '@/pages/OkkeWorld/FeaturesSection';

interface FeatureModalProps {
  modalRef: RefObject<HTMLDivElement | null>;
  modalBgRef: RefObject<HTMLDivElement | null>;
  modalContentRef: RefObject<HTMLDivElement | null>;
  selectedFeature: number;
  closeFeatureModal: () => void;
}

const FeatureModal: FC<FeatureModalProps> = ({
  modalRef,
  modalBgRef,
  modalContentRef,
  selectedFeature,
  closeFeatureModal,
}) => {
  const selectedFeatureData = FEATURES_DATA[selectedFeature];

  return (
    <div
      ref={modalRef}
      className="custom-modal invisible fixed top-0 left-0 z-999 h-full w-full opacity-0"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalBgRef}
        className="modal-bg bg-primary/85 absolute top-0 left-0 h-full w-full opacity-0"
        onClick={closeFeatureModal}
      />
      <div
        ref={modalContentRef}
        className="modal-zoom invisible absolute top-1/2 left-1/2 h-auto w-[90%] -translate-1/2 scale-60 bg-white opacity-0 md:w-[50vw]"
      >
        <div className="absolute top-4 right-4 z-45">
          <CloseButton onClick={closeFeatureModal} />
        </div>
        <div className="relative box-border h-auto w-full px-[5vw] py-[3rem] md:py-[5rem]">
          <div className="relative flex h-auto w-full flex-col items-start justify-start gap-4">
            <h3 className="font-humane text-secondary m-0 text-[15vw] leading-[75%] uppercase md:text-[5vw]">
              {selectedFeatureData.label}
            </h3>
            <p className="text-primary text-base leading-[1.25rem]">
              {selectedFeatureData.des}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;
