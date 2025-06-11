import React from 'react';
import { WeCard } from '../../ui/card/we-card';
import { Speed,
    Mobile,
    Seo,        
    Strong,
    Integration,
    Testing
 } from '../../../assets/icons';

export const WeSection: React.FC = () => {
  return (
    <section className="py-16 bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-5xl font-bold mb-4">We Are</h2>
        <p className="text-[18px] text-zinc-400 mb-2">
          We are dynamic young people, aiming to create a smart connection platform – where everyone can easily find opportunities, partners, and clear career directions.
        </p>
        <p className="text-[18px] text-zinc-400">
          We chose to build Nexora because we see a great demand for a modern social networking application, integrated with AI, to help connect faster, more accurately, and more efficiently. Nexora is not just a place to meet, but a stepping stone for development and self-affirmation in the digital age.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <WeCard
          icon={<Strong />}
          title="Strong Connections"
          description="Helps you meet, collaborate, and develop your career in a short time."
        />
        <WeCard
          icon={<Speed />}
          title="Instant Networking"
          description="Discover and connect with people in your field or desired position instantly."
        />
        <WeCard
          icon={<Integration />}
          title="AI Integration"
          description="Introduces you to suitable employers or ideal collaboration opportunities."
        />
        <WeCard
          icon={<Mobile/>}
          title="Mobile App"
          description="Egestas tellus nunc proin amet tellus tincidunt lacus consequat. Ultrices."
        />
        <WeCard
          icon={<Seo />}
          title="SEO"
          description="Integer ante non nunc, eget est justo vel semper nunc. Lacus."
        />
        <WeCard
          icon={<Testing />}
          title="User Testing"
          description="Sed faucibus faucibus egestas volutpat, accumsan adipiscing egestas est. Auctor et leo urna est."
        />
      </div>
    </section>
  );
}
