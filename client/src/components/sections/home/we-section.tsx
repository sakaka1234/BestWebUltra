import React from "react";
import { motion } from "framer-motion";
import { WeCard } from "../../ui/card/we-card";
import {
  Speed,
  Mobile,
  Seo,
  Strong,
  Integration,
  Testing,
} from "../../../assets/icons";

export const WeSection: React.FC = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const titleVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const paragraphVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

  return (
    <section className="py-16 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-10 px-4">
        <motion.h2
          className="text-5xl font-bold mb-4"
          initial="hidden"
          whileInView="visible"
          variants={titleVariant}
          viewport={{ once: true }}
        >
          We Are
        </motion.h2>

        <motion.p
          className="text-[18px] text-zinc-400 mb-2"
          initial="hidden"
          whileInView="visible"
          variants={paragraphVariant}
          viewport={{ once: true }}
        >
          We are dynamic young people, aiming to create a smart connection
          platform – where everyone can easily find opportunities, partners, and
          clear career directions.
        </motion.p>

        <motion.p
          className="text-[18px] text-zinc-400"
          initial="hidden"
          whileInView="visible"
          variants={paragraphVariant}
          viewport={{ once: true }}
        >
          We chose to build Nexora because we see a great demand for a modern
          social networking application, integrated with AI, to help connect
          faster, more accurately, and more efficiently. Nexora is not just a
          place to meet, but a stepping stone for development and
          self-affirmation in the digital age.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={item}>
          <WeCard
            icon={<Strong />}
            title="Strong Connections"
            description="Helps you meet, collaborate, and develop your career in a short time."
          />
        </motion.div>
        <motion.div variants={item}>
          <WeCard
            icon={<Speed />}
            title="Instant Networking"
            description="Discover and connect with people in your field or desired position instantly."
          />
        </motion.div>
        <motion.div variants={item}>
          <WeCard
            icon={<Integration />}
            title="AI Integration"
            description="Introduces you to suitable employers or ideal collaboration opportunities."
          />
        </motion.div>
        <motion.div variants={item}>
          <WeCard
            icon={<Mobile />}
            title="Mobile App"
            description="Egestas tellus nunc proin amet tellus tincidunt lacus consequat. Ultrices."
          />
        </motion.div>
        <motion.div variants={item}>
          <WeCard
            icon={<Seo />}
            title="SEO"
            description="Integer ante non nunc, eget est justo vel semper nunc. Lacus."
          />
        </motion.div>
        <motion.div variants={item}>
          <WeCard
            icon={<Testing />}
            title="User Testing"
            description="Sed faucibus faucibus egestas volutpat, accumsan adipiscing egestas est. Auctor et leo urna est."
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
