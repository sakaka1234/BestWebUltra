import { motion, Variants } from "framer-motion";
import { choose } from "../../../assets/images";

export const WhyChooseSection: React.FC = () => {
  // Animation variants with proper typing
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const imageVariant: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  const buttonVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        type: "spring" as const,
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="w-full bg-black flex flex-col md:flex-row items-center justify-center py-16 px-4 md:px-12 lg:px-24 gap-10 md:gap-20 overflow-hidden">
      <motion.div
        className="flex-shrink-0 flex items-center justify-center"
        initial="hidden"
        whileInView="visible"
        variants={imageVariant}
        viewport={{ once: true, margin: "-100px" }}
      >
        <img
          src={choose}
          alt="Why choose us illustration"
          className="select-none pointer-events-none"
          draggable="false"
        />
      </motion.div>

      <motion.div
        className="flex flex-col max-w-xl text-left"
        initial="hidden"
        whileInView="visible"
        variants={container}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-white text-4xl md:text-5xl font-bold mb-6 font-montserrat"
          variants={item}
        >
          Why choose us
        </motion.h2>

        <motion.ul
          className="text-[#b0aeb8] text-base md:text-lg leading-relaxed space-y-2 mb-8"
          variants={container}
        >
          <motion.li variants={item}>
            High practical demand: Helps users connect and find career
            opportunities quickly.
          </motion.li>
          <motion.li variants={item}>
            Smart AI integration: Analyzes skills, suggests connections and
            suitable jobs.
          </motion.li>
          <motion.li variants={item}>
            Modern trends: Keeps up with professional, global networking models.
          </motion.li>
          <motion.li variants={item}>
            Scalability: Has strong potential to develop into a large platform.
          </motion.li>
          <motion.li variants={item}>
            Supports user development: Helps understand yourself and build an
            effective career.
          </motion.li>
        </motion.ul>

        <motion.button
          className="w-fit px-6 py-2 border border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-200 text-base"
          variants={buttonVariant}
          whileHover="hover"
        >
          LET'S CONNECT
        </motion.button>
      </motion.div>
    </section>
  );
};
