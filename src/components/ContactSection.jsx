import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <motion.section
      id="contact"
      className="py-16 bg-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Contact Us
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
              ></textarea>
              <button className="w-full px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300">
                Send Message
              </button>
            </form>
          </div>
          <div className="md:w-1/2 text-gray-600">
            <p className="mb-4">Address: 123 Tanjung Street, City, Country</p>
            <p className="mb-4">Phone: +123 456 7890</p>
            <p>Email: info@11tanjung.com</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
