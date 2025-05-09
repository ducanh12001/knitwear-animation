import { useState } from "react";
import { Link } from "react-router";

const footerLinks = [
  {
    title: "AKKE Knitwear",
    links: [
      { label: "Menswear", path: "/product-category/menswear-collection" },
      { label: "Womenswear", path: "/product-category/womenswear-collection" },
      { label: "Everest Akke Limited", path: "/everest-akke-limited" },
      { label: "Akkeworld", path: "/akkeworld" },
      { label: "Contacts", path: "/contacts" },
    ],
  },
  {
    title: "Legal Area",
    links: [
      { label: "Terms of Sale", path: "https://akkeknitwear.com/condizioni-di-vendita/" },
      { label: "Privacy Policy", path: "https://akkeknitwear.com/privacy-policy/" },
    ],
  },
  {
    title: "Follow us",
    links: [
      { label: "Instagram", path: "https://www.instagram.com/akkeknitwear/" },
      { label: "Facebook", path: "https://www.facebook.com/profile.php?id=100093662019914" },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    empty: false,
    invalid: false,
    exists: false,
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ empty: false, invalid: false, exists: false });
    setSuccess(false);

    if (!email) {
      setErrors((prev) => ({ ...prev, empty: true }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({ ...prev, invalid: true }));
      return;
    }
    if (email === "test@example.com") {
      setErrors((prev) => ({ ...prev, exists: true }));
      return;
    }

    setSuccess(true);
    setEmail("");
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
              Iscriviti alla nostra newsletter per ricevere un codice sconto sul tuo prossimo
              acquisto
            </p>
          </div>
          <div className="relative box-border w-full pl-0 md:w-1/2 md:pl-16">
            <form
              className="relative flex h-auto w-full items-center justify-start rounded-2xl border border-white md:rounded-3xl"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="EMAIL"
                className="relative box-border h-full w-full rounded-3xl border-0 bg-transparent px-8 py-4 text-xl text-white outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div
                className="relative flex h-16 w-16 cursor-pointer items-center justify-center text-white"
                onClick={handleSubmit}
              >
                <div className="relative h-6 w-6 -rotate-90 bg-[#302F35] mask-[url('/src/assets/arrow.svg')] mask-no-repeat" />
              </div>
              <div className="absolute right-0 -bottom-2 w-full">
                {errors.empty && (
                  <span className="absolute right-0 text-xs text-[#FD7453]">
                    Il campo non può essere vuoto
                  </span>
                )}
                {errors.invalid && (
                  <span className="absolute right-0 text-xs text-[#FD7453]">
                    Inserisci un indirizzo valido
                  </span>
                )}
                {errors.exists && (
                  <span className="absolute right-0 text-xs text-[#FD7453]">
                    Indirizzo già iscritto alla nostra newsletter
                  </span>
                )}
                {success && (
                  <span className="absolute right-0 text-xs text-green-400">Iscritto!</span>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="relative flex h-auto w-full flex-col items-start justify-start gap-8 md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="flex grid-cols-3 flex-col gap-8 md:grid md:gap-[10rem]">
            {footerLinks.map((section, index) => (
              <div key={index} className="relative flex h-auto w-full flex-col gap-4 md:gap-8">
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
