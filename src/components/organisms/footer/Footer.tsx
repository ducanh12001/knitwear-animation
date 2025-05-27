import React, { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import type { FooterSection } from '@/types';

interface NewsletterFormData {
  email: string;
}

const footerLinks: FooterSection[] = [
  {
    title: 'AKKE Knitwear',
    links: [
      { label: 'Menswear', path: '/product-category/menswear-collection' },
      { label: 'Womenswear', path: '/product-category/womenswear-collection' },
      { label: 'Everest Akke Limited', path: '/everest-akke-limited' },
      { label: 'Akkeworld', path: '/akkeworld' },
      { label: 'Contacts', path: '/contacts' },
    ],
  },
  {
    title: 'Legal Area',
    links: [
      { label: 'Terms of Sale', path: '/terms-of-sale' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
    ],
  },
  {
    title: 'Follow us',
    links: [
      { label: 'Instagram', path: '/' },
      { label: 'Facebook', path: '/' },
    ],
  },
];

const Footer: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<NewsletterFormData>({
    mode: 'onSubmit',
  });

  const onSubmit = async (data: NewsletterFormData): Promise<void> => {
    setSuccess(false);

    // Check if email already exists (simulate API call)
    if (data.email === 'test@example.com') {
      setError('email', {
        type: 'manual',
        message: 'Address already subscribed to our newsletter',
      });
      return;
    }

    // Simulate successful submission
    setSuccess(true);
    reset();
  };

  return (
    <footer className="relative box-border w-full bg-[#A9AFA4] px-[5vw] py-[3.75rem] md:py-[5vw]">
      <div className="relative flex h-auto w-full flex-col gap-[5rem] md:gap-[15rem]">
        <div className="relative flex h-auto w-full flex-col gap-8 md:flex-row md:gap-0">
          <div className="relative w-full md:w-1/2">
            <h2 className="font-humane leading-full m-0 text-[15vw] font-bold text-[#302F35] uppercase md:text-[6vw]">
              Subscribe to newsletter
            </h2>
            <p className="leading-full text-base text-white">
              Sign up for our newsletter to receive a discount code on your next
              purchase
            </p>
          </div>
          <div className="relative box-border w-full pl-0 md:w-1/2 md:pl-16">
            <form
              className="relative flex h-auto w-full items-center justify-start rounded-2xl border border-white md:rounded-3xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="email"
                placeholder="EMAIL"
                className="relative box-border h-full w-full rounded-3xl border-0 bg-transparent px-8 py-4 text-xl text-white outline-none placeholder:text-white/70"
                {...register('email', {
                  required: 'The field cannot be empty',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid address',
                  },
                })}
              />
              <button
                type="submit"
                className="relative flex h-16 w-16 cursor-pointer items-center justify-center text-white"
              >
                <div className="relative h-6 w-6 -rotate-90 bg-[#302F35] mask-[url('/src/assets/arrow.svg')] mask-no-repeat" />
              </button>
              <div className="absolute right-0 -bottom-2 w-full">
                {errors.email && (
                  <span className="text-secondary absolute right-0 text-xs">
                    {errors.email.message}
                  </span>
                )}
                {success && (
                  <span className="absolute right-0 text-xs text-green-400">
                    Iscritto!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="relative flex h-auto w-full flex-col items-start justify-start gap-8 md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="flex grid-cols-3 flex-col gap-8 md:grid md:gap-[10rem]">
            {footerLinks.map((section, index) => (
              <div
                key={index}
                className="relative flex h-auto w-full flex-col gap-4 md:gap-8"
              >
                <h3 className="leading-full text-[14px] text-[#302F35] uppercase md:text-xl">
                  {section.title}
                </h3>
                <ul className="relative h-auto w-full space-y-0 md:space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.path}
                        className="leading-full text-[14px] text-white uppercase md:text-xl"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative box-border flex h-auto w-full items-center justify-between">
          <div className="relative flex w-auto flex-col items-start justify-start gap-0 md:flex-row md:items-center md:gap-4">
            <p className="leading-full text-[14px] text-[#302F35] uppercase md:text-xl">
              ©2023 New Esse Maglieria s.r.l.
            </p>
            <p className="leading-full text-[14px] text-[#302F35] uppercase md:text-xl">
              P.Iva 01807740434
            </p>
            <a
              href="https://www.awdagency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="leading-full mt-2 text-[14px] font-normal text-[#302F35] uppercase md:mt-0 md:text-xl"
            >
              Credits Awd Agency
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
