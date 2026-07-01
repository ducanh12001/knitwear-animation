import { useState, type FC } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { VALIDATION } from '@/constant/validation';
import type { FooterSection } from '@/types';

interface NewsletterFormData {
  email: string;
}

const footerLinks: FooterSection[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Menswear', path: '/product-category/menswear-collection' },
      { label: 'Womenswear', path: '/product-category/womenswear-collection' },
      { label: 'Everest Okke Limited', path: '/everest-okke-limited' },
      { label: 'Okkeworld', path: '/okkeworld' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contacts', path: '/contacts' },
      { label: 'Terms of Sale', path: '/terms-of-sale' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
    ],
  },
  {
    title: 'Follow',
    links: [
      { label: 'Instagram', path: 'https://instagram.com' },
      { label: 'Facebook', path: 'https://facebook.com' },
    ],
  },
];

const Footer: FC = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    setError,
  } = useForm<NewsletterFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (data: NewsletterFormData): Promise<void> => {
    setSuccess(false);

    if (data.email === 'test@example.com') {
      setError('email', {
        type: 'manual',
        message: 'This address is already subscribed',
      });
      return;
    }

    setSuccess(true);
    reset();
  };

  return (
    <footer className="relative w-full bg-accent-gray px-[5vw] py-14 md:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-surface-dark/15 pb-14 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <h2 className="font-humane leading-full text-[clamp(2.5rem,8vw,4.5rem)] text-surface-dark uppercase">
              Newsletter
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white md:text-base">
              Sign up for updates and receive a discount code on your next
              purchase.
            </p>
          </div>

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="flex overflow-hidden rounded-full border border-white bg-white/10">
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/60 md:px-6 md:py-4 md:text-base"
                {...register('email', {
                  ...VALIDATION.REQUIRED,
                  ...VALIDATION.EMAIL,
                })}
              />
              <button
                type="submit"
                className="bg-secondary shrink-0 px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-secondary-hover md:px-8 md:text-base"
              >
                Join
              </button>
            </div>
            {isSubmitted && errors.email && (
              <span className="text-secondary text-xs">{errors.email.message}</span>
            )}
            {success && (
              <span className="text-xs text-white/90">
                Subscribed successfully.
              </span>
            )}
          </form>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12">
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-bold tracking-widest text-surface-dark uppercase">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.path.startsWith('http') ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white transition-colors hover:text-white/80 md:text-base"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-sm text-white transition-colors hover:text-white/80 md:text-base"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-surface-dark/15 pt-8 text-xs text-surface-dark md:flex-row md:items-center md:justify-between md:text-sm">
          <p>© 2026 New Esse Maglieria s.r.l. — P.IVA 01807740434</p>
          <a
            href="https://www.awdagency.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-surface-dark/70"
          >
            Credits AWD Agency
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
