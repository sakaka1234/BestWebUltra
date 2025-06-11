import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
export const HeroSection = () => {
  return (
    <section
      className="min-h-screen bg-gradient-to-b from-sky-900 to-black flex xl:flex-row flex-col-reverse items-center justify-between
    lg:px-24 px-10 relative overflow-hidden 
    "
    >
      {/* Left section */}
      <div className="z-40 xl:mb-0 mb-[20%]">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "string",
            stiffness: 40,
            delay: 1.3,
            damping: 25,
            duration: 1.5,
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold z-10 mb-6"
        >
          Expanding fast <br />
          Networking platform.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "string",
            stiffness: 40,
            delay: 1.8,
            damping: 25,
            duration: 1.5,
          }}
          className="text-xl md:text-1xl lg:text-2xl text-sky-200 max-w-2xl"
        >
          A networking app that can connect people together in a short time. Ai
          built-in function can help analyze your ability and introduce you to
          employer. Nexora will empower your connection to the next level.
        </motion.p>
      </div>
      {/* Right section */}
      <Spline
        className="absolute xl:left-[27%] xl:top-[7%] max-sm:flex max-sm:-translate-y-24 max-[486px]:-translate-y-40
        "
        scene="https://prod.spline.design/IfdOCJaJaqGNgK3X/scene.splinecode"
      />
    </section>
  );
};

