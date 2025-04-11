import { motion } from "framer-motion";

const GallerySection = () => {
  const images = [
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/400x300",
  ];

  return (
    <motion.section
      id="gallery"
      className="py-16 bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default GallerySection;
