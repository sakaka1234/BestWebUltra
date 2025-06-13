import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

export const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-orange-600 flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">
      {/* Left section */}
      <div
        className="z-40
    max-w-5xl
    xl:mb-0
    mb-[20%]
    max-sm:absolute 
    max-sm:top-1/2 
    max-sm:-translate-y-1/2"
      >
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            delay: 1.3,
            damping: 25,
            duration: 1.5,
          }}
          className="text-5xl md:text-5xl lg:text-8xl font-bold z-10 mb-6 text-white leading-tight"
        >
          Expanding fast{" "}
          <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Networking
          </span>{" "}
          platform.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            delay: 1.8,
            damping: 25,
            duration: 1.5,
          }}
          className="text-lg md:text-xl text-gray-300 max-w-lg mb-8 leading-relaxed"
        >
          An networking app that can connect people together in a short time. AI
          built-in function can help analyze your ability and introduce you to
          employer. Nexora will empower your connection to the next level.
        </motion.p>

        {/* Search section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            delay: 2.3,
            damping: 25,
            duration: 1.5,
          }}
          className="flex items-center gap-4 mt-8"
        >
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-6 py-4 bg-black/20 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 backdrop-blur-sm"
            />
          </div>
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            ATTRACT
          </button>
        </motion.div>
      </div>

      {/* Right section - 3D Globe */}
      <Spline
        className="z-30 absolute 
    xl:left-[27%] xl:top-[7%] 
    max-sm:flex max-sm:-translate-y-24 max-[486px]:-translate-y-40 
    max-sm:opacity-0 max-sm:invisible max-sm:pointer-events-none
        "
        scene="https://prod.spline.design/IfdOCJaJaqGNgK3X/scene.splinecode"
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
    </section>
  );
};
