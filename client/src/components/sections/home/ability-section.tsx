import React from "react";
import { AbilityCard } from "../../ui/card/ability-card";

export const AbilitySection: React.FC = () => {
  return (
    <section className="w-full bg-[#100e11] py-16 px-4 md:px-16 flex flex-col md:flex-row gap-10 md:gap-16">
      <div className="flex flex-col max-w-[420px] min-w-[320px]">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight font-montserrat">
          Some of Nexora's capabilities
        </h2>
        <p className="text-[#b0aeb8] text-base mb-8 leading-relaxed">
          Here are some things our website can help you with
        </p>
        <button className="w-fit px-6 py-2 border border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-200 text-base">
          SHOW MORE
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex gap-8">
          <div className="flex flex-col gap-6 w-1/2">
            <AbilityCard
              tag="WEBSITE"
              title="🤝Quick connection"
              hasImage
              imageHeight="h-40"
            />
            <AbilityCard
              tag="AI"
              title="🤖AI-powered capability analysis"
            />
            <AbilityCard
              tag="JOB OPPORTUNITY"
              title="💼Recommend suitable job opportunities"
            />
          </div>
          <div className="flex flex-col gap-6 w-1/2">
            <AbilityCard
              tag="CONNECTIONS"
              title="👥Relationship linking"
            />
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
          </div>
        </div>
      </div>
    </section>
  );
};
