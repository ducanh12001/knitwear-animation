import { PRIVACY_POLICY, TERMS_OF_SALE } from "@/common/const/terms";
import React from "react";

function TermsAndPolicies({ isTerm = true }) {
  return (
    <>
      <section className="legal--section-intro relative box-border h-auto w-full px-[5vw] pt-[8rem] md:pt-[calc(10vh+10rem)]">
        <div className="wrapper relative">
          <div className="title relative z-11 flex h-auto w-full flex-col items-start justify-start">
            <h1 className="font-humane text-[80px] leading-[75%] text-[#302F35] md:text-[6vw]">
              {isTerm ? "Terms of Sale" : "Privacy Policy"}
            </h1>
          </div>
        </div>
      </section>
      <section className="legal--section-content relative box-border h-auto w-full px-[5vw] pt-[4rem] pb-[5rem] md:pt-[5rem]">
        <div className="wrapper relative flex h-auto w-full flex-col gap-[3rem]">
          {(isTerm ? TERMS_OF_SALE : PRIVACY_POLICY).map((section, index) => (
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
                  section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="leading-[120%] text-[#1d1d1d]">
                      {paragraph}
                    </p>
                  ))}

                {section.addressBlock && (
                  <div className="relative box-border h-auto w-full">
                    <div className="relative flex w-full flex-col gap-4">
                      <h3 className="leading-[75%] text-[#302F35]">
                        {section.addressBlock.heading}
                      </h3>
                      <p className="leading-[120%] whitespace-pre-line text-[#1d1d1d]">
                        {section.addressBlock.address}
                      </p>
                    </div>
                  </div>
                )}

                {section.list && (
                  <ul className="relative flex !list-inside !list-disc flex-col gap-2">
                    {section.list.map((item, lIndex) => (
                      <li
                        key={lIndex}
                        className="leading-[120%] text-[#1d1d1d]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.orderedList && (
                  <ol className="relative m-0 flex !list-inside !list-decimal flex-col gap-2 p-0">
                    {section.orderedList.map((item, olIndex) => (
                      <li
                        key={olIndex}
                        className="leading-[120%] text-[#1d1d1d]"
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default TermsAndPolicies;
