import { motion, Variants } from "framer-motion";

export const ContactSection = () => {
  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  const formItem: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariant: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      backgroundColor: "#0ea5e9",
      color: "#000",
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const backgroundVariant: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="w-full flex justify-center items-center bg-[#110F0F] py-16 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <motion.div
        className="w-full max-w-4xl rounded-lg shadow-lg flex flex-col items-center py-16 px-4 border-2 border-sky-700 bg-gradient-to-tr from-sky-900 to-black"
        variants={backgroundVariant}
      >
        <motion.h2
          className="text-4xl font-semibold mb-2 text-white"
          variants={item}
        >
          Contact
        </motion.h2>
        <motion.p className="text-sky-200 mb-8 text-center" variants={item}>
          Any questions or requests, let us know!
        </motion.p>

        <motion.form
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center"
          variants={container}
        >
          <motion.div variants={formItem}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-full border border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 text-white bg-sky-800 shadow-sm min-w-[220px] placeholder:text-sky-300"
            />
          </motion.div>
          <motion.button
            type="submit"
            className="px-6 py-2 rounded-full bg-black text-sky-300 font-semibold transition-colors border border-sky-700"
            variants={buttonVariant}
            whileHover="hover"
            whileTap="tap"
          >
            SEND
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Go to Top Button would be animated here */}
    </motion.section>
  );
};
