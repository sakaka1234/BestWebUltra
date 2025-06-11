import { choose } from "../../../assets/images";

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="w-full  bg-black flex flex-col md:flex-row items-center justify-center py-16 px-4 md:px-12 lg:px-24 gap-10 md:gap-20">
      <div className="flex-shrink-0 flex items-center justify-center">
        <img
          src={choose}
          alt="Why choose us illustration"
          className=" select-none pointer-events-none"
          draggable="false"
        />
      </div>
      <div className="flex flex-col max-w-xl text-left">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 font-montserrat">Why choose us</h2>
        <ul className="text-[#b0aeb8] text-base md:text-lg leading-relaxed space-y-2 mb-8">
          <li>High practical demand: Helps users connect and find career opportunities quickly.</li>
          <li>Smart AI integration: Analyzes skills, suggests connections and suitable jobs.</li>
          <li>Modern trends: Keeps up with professional, global networking models.</li>
          <li>Scalability: Has strong potential to develop into a large platform.</li>
          <li>Supports user development: Helps understand yourself and build an effective career.</li>
        </ul>
        <button className="w-fit px-6 py-2 border border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-200 text-base">
          LET'S CONNECT
        </button>
      </div>
    </section>
  );
}
