import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">11Tanjung</div>
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0`}
        >
          <li>
            <a
              href="#hero"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <div className="space-y-2 cursor-pointer">
            <span className="block w-8 h-0.5 bg-gray-600"></span>
            <span className="block w-8 h-0.5 bg-gray-600"></span>
            <span className="block w-8 h-0.5 bg-gray-600"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
