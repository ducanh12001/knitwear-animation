import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <motion.section
      id="about"
      className="py-16 bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600">
            11Tanjung offers a unique blend of luxury and comfort, designed to
            elevate your lifestyle. Nestled in a prime location, we provide
            unparalleled services and amenities to our guests.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://via.placeholder.com/500x300"
            alt="About 11Tanjung"
            className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
