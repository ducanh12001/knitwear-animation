import { useState } from "react";
import { motion } from "framer-motion";

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
    <footer className="relative box-border w-full bg-[#A9AFA4] p-16">
      <div className="relative flex h-auto w-full flex-col gap-[15rem]">
        <div className="relative flex h-auto w-full flex-col gap-8 md:flex-row md:gap-0">
          <div className="relative w-1/2">
            <h2 className="font-humane leading-full m-0 text-[6vw] font-bold text-[#302F35] uppercase">
              Subscribe to newsletter
            </h2>
            <p className="leading-full text-base text-white">
              Iscriviti alla nostra newsletter per ricevere un codice sconto sul
              tuo prossimo acquisto
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
                  <span className="absolute right-0 text-xs text-green-400">
                    Iscritto!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="relative flex h-auto w-full items-center justify-between">
          <div className="flex grid-cols-3 flex-col gap-8 md:grid md:gap-[10rem]">
            <div className="relative flex h-auto w-full flex-col gap-4 md:gap-8">
              <h3 className="leading-full text-xl text-[#302F35] uppercase">
                AKKE Knitwear
              </h3>
              <ul className="relative h-auto w-full space-y-0 md:space-y-2">
                <li>
                  <a
                    href="https://akkeknitwear.com/categoria-prodotto/menswear/"
                    className="leading-full text-xl text-white uppercase"
                  >
                    Menswear
                  </a>
                </li>
                <li>
                  <a
                    href="https://akkeknitwear.com/categoria-prodotto/womenswear/"
                    className="leading-full text-xl text-white uppercase"
                  >
                    Womenswear
                  </a>
                </li>
                <li>
                  <a
                    href="https://akkeknitwear.com/everest-akke-limited/"
                    className="leading-full text-xl text-white uppercase"
                  >
                    Everest Akke Limited
                  </a>
                </li>
                <li>
                  <a
                    href="https://akkeknitwear.com/akkeworld/"
                    className="leading-full text-xl text-white uppercase"
                  >
                    Akkeworld
                  </a>
                </li>
                <li>
                  <a
                    href="https://akkeknitwear.com/contatti/"
                    className="leading-full text-xl text-white uppercase"
                  >
                    Contatti
                  </a>
                </li>
              </ul>
            </div>
            <div className="relative flex h-auto w-full flex-col gap-4 md:gap-8">
              <h3 className="leading-full text-xl text-[#302F35] uppercase">
                Legal Area
              </h3>
              <ul className="relative h-auto w-full space-y-0 md:space-y-2">
                <li>
                  <a
                    href="https://akkeknitwear.com/condizioni-di-vendita/"
                    className="leading-full text-xl text-white uppercase"
                  >
                    CONDIZIONI DI VENDITA
                  </a>
                </li>
                <li>
                  <a
                    href="https://akkeknitwear.com/privacy-policy/"
                    className="leading-full text-xl text-white uppercase"
                  >
                    PRIVACY POLICY
                  </a>
                </li>
              </ul>
            </div>
            <div className="relative flex h-auto w-full flex-col gap-4 md:gap-8">
              <h3 className="leading-full text-xl text-[#302F35] uppercase">
                Follow us
              </h3>
              <ul className="relative h-auto w-full space-y-0 md:space-y-2">
                <li>
                  <a
                    href="https://www.instagram.com/akkeknitwear/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-full text-xl text-white uppercase"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100093662019914"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-full text-xl text-white uppercase"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative box-border flex h-auto w-full items-center justify-between">
          <div className="relative flex w-auto flex-col items-start justify-start gap-0 md:flex-row md:items-center md:gap-4">
            <p className="leading-full text-xl text-[#302F35] uppercase">
              ©2023 New Esse Maglieria s.r.l.
            </p>
            <p className="leading-full text-xl text-[#302F35] uppercase">
              P.Iva 01807740434
            </p>
            <a
              href="https://www.awdagency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="leading-full mt-2 text-xl font-normal text-[#302F35] uppercase md:mt-0"
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
