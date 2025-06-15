import React from "react";
import { motion, Variants } from "framer-motion";
import { AbilityCard } from "../../ui/card/ability-card";

export const AbilitySection: React.FC = () => {
  // Animation variants
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

  const leftColumn: Variants = {
    hidden: { opacity: 0, x: -50 },
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

  const rightColumn: Variants = {
    hidden: { opacity: 0, x: 50 },
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.section
      className="w-full bg-[#100e11] py-16 px-4 md:px-16 flex flex-col md:flex-row gap-10 md:gap-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <motion.div
        className="flex flex-col max-w-[420px] min-w-[320px]"
        variants={container}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight font-montserrat"
          variants={item}
        >
          Some of Nexora's capabilities
        </motion.h2>
        <motion.p
          className="text-[#b0aeb8] text-base mb-8 leading-relaxed"
          variants={item}
        >
          Here are some things our website can help you with
        </motion.p>
        <motion.button
          className="w-fit px-6 py-2 border border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-200 text-base"
          variants={buttonVariant}
          whileHover="hover"
        >
          SHOW MORE
        </motion.button>
      </motion.div>

      <motion.div className="flex-1 min-w-0" variants={container}>
        <div className="flex gap-8">
          <motion.div
            className="flex flex-col gap-6 w-1/2"
            variants={leftColumn}
          >
            <AbilityCard
              tag="WEBSITE"
              title="🤝Quick connection"
              hasImage
              imageHeight="h-40"
            />
            <AbilityCard tag="AI" title="🤖AI-powered capability analysis" />
            <AbilityCard
              tag="JOB OPPORTUNITY"
              title="💼Recommend suitable job opportunities"
            />
          </motion.div>
          <motion.div
            className="flex flex-col gap-6 w-1/2"
            variants={rightColumn}
          >
            <AbilityCard tag="CONNECTIONS" title="👥Relationship linking" />
            <AbilityCard
              tag="CAREER"
              title="🌐Create a professional profile"
              hasImage
              imageHeight="h-40"
            />
            <AbilityCard
              tag="TRACKING"
              title="📊Connection progress tracking & statistics"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};
