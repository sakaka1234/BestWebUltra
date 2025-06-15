import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { COMMENTS } from "../../../constants/comment";
import { CommentCard } from "../../ui/card/comment-card";

export const CommentSection: React.FC = () => {
  const [start, setStart] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const visibleCount = 4;

  const handlePrev = () => {
    setDirection(-1);
    setStart((prev) => (prev - 1 + COMMENTS.length) % COMMENTS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setStart((prev) => (prev + 1) % COMMENTS.length);
  };

  const visibleComments = Array.from(
    { length: visibleCount },
    (_, i) => COMMENTS[(start + i) % COMMENTS.length]
  );

  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const commentItem: Variants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -50 : 50,
      transition: { duration: 0.3 },
    }),
  };

  const buttonVariant: Variants = {
    hover: {
      scale: 1.1,
      backgroundColor: "#4b5563",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const titleVariant: Variants = {
    hidden: { opacity: 0, y: -20 },
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

  return (
    <div className="py-16 px-12 bg-black overflow-hidden">
      <div className="mx-auto px-4">
        <motion.div
          className="text-white mb-8 text-2xl font-medium"
          initial="hidden"
          whileInView="visible"
          variants={titleVariant}
          viewport={{ once: true }}
        >
          Hear what our customers say :)
        </motion.div>

        <motion.div
          className="flex gap-6 items-stretch min-h-[300px]"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence custom={direction} mode="popLayout">
            {visibleComments.map((c, idx) => (
              <motion.div
                key={`${start}-${idx}`}
                custom={direction}
                variants={commentItem}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1"
              >
                <CommentCard {...c} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-end gap-2 mt-6">
          <motion.button
            onClick={handlePrev}
            className="w-12 h-12 flex items-center justify-center border border-white bg-gray-900 rounded-md text-white text-xl hover:bg-gray-700 transition-colors shadow-lg"
            aria-label="Previous"
            variants={buttonVariant}
            whileHover="hover"
            whileTap="tap"
          >
            {"<"}
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center border border-white bg-gray-900 rounded-md text-white text-xl hover:bg-gray-700 transition-colors shadow-lg"
            aria-label="Next"
            variants={buttonVariant}
            whileHover="hover"
            whileTap="tap"
          >
            {">"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
