import type { FC } from 'react';
import { PRIVACY_POLICY, TERMS_OF_SALE } from '@/common/const/terms';

interface TermsAndPoliciesProps {
  isTerm?: boolean;
}

interface Section {
  heading?: string;
  content?: string[];
  addressBlock?: {
    heading: string;
    address: string;
  };
  list?: string[];
  orderedList?: string[];
}

const TermsAndPolicies: FC<TermsAndPoliciesProps> = ({ isTerm = true }) => {
  return (
    <>
      <section className="legal--section-intro relative box-border h-auto w-full px-[5vw] pt-[8rem] md:pt-[calc(10vh+10rem)]">
        <div className="wrapper relative">
          <div className="title relative z-11 flex h-auto w-full flex-col items-start justify-start">
            <h1 className="font-humane text-[80px] leading-[75%] text-[#302F35] md:text-[6vw]">
              {isTerm ? 'Terms of Sale' : 'Privacy Policy'}
            </h1>
          </div>
        </div>
      </section>
      <section className="legal--section-content relative box-border h-auto w-full px-[5vw] pt-[4rem] pb-[5rem] md:pt-[5rem]">
        <div className="wrapper relative flex h-auto w-full flex-col gap-[3rem]">
          {(isTerm ? TERMS_OF_SALE : PRIVACY_POLICY).map(
            (section: Section, index: number) => (
              <div
                key={index}
                className="wp-block-group relative box-border h-auto w-full"
              >
                <div className="wp-block-group__inner-container relative flex h-auto w-full flex-col gap-4">
                  {section.heading && (
                    <h2 className="text-2xl leading-[75%] text-[#302F35]">
                      {section.heading}
                    </h2>
                  )}

                  {section.content &&
                    section.content.map((paragraph: string, pIndex: number) => (
                      <p key={pIndex} className="text-primary leading-[120%]">
                        {paragraph}
                      </p>
                    ))}

                  {section.addressBlock && (
                    <div className="relative box-border h-auto w-full">
                      <div className="relative flex w-full flex-col gap-4">
                        <h3 className="leading-[75%] text-[#302F35]">
                          {section.addressBlock.heading}
                        </h3>
                        <p className="text-primary leading-[120%] whitespace-pre-line">
                          {section.addressBlock.address}
                        </p>
                      </div>
                    </div>
                  )}

                  {section.list && (
                    <ul className="relative flex !list-inside !list-disc flex-col gap-2">
                      {section.list.map((item: string, lIndex: number) => (
                        <li
                          key={lIndex}
                          className="text-primary leading-[120%]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.orderedList && (
                    <ol className="relative m-0 flex !list-inside !list-decimal flex-col gap-2 p-0">
                      {section.orderedList.map(
                        (item: string, olIndex: number) => (
                          <li
                            key={olIndex}
                            className="text-primary leading-[120%]"
                          >
                            {item}
                          </li>
                        ),
                      )}
                    </ol>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </>
  );
};

export default TermsAndPolicies;
