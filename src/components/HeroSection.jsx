import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.section
      id="hero"
      className="h-screen bg-gray-100 flex items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
          11Tanjung
        </h1>
        <p className="text-lg md:text-2xl text-gray-600">
          Luxury Living Redefined
        </p>
        <a
          href="#about"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          Discover More
        </a>
      </div>
    </motion.section>
  );
};

export default HeroSection;
