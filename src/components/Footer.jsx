import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-6 bg-gray-800 text-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 text-center">
        <p>© 2025 11Tanjung. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
