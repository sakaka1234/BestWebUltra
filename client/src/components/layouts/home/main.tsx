import { HeroSection } from "../../sections/home/hero-section";
import { ContactSection } from "../../sections/home/contact-section";
import { CommentSection } from "../../sections/home/comment-section";
import { AbilitySection } from "../../sections/home/ability-section";
import { WhyChooseSection } from "../../sections";
import { WeSection } from "../../sections/home/we-section";

export const MainHome = () => {
    return (
        <main className="flex flex-col">
            <HeroSection />
            <WeSection />
            <WhyChooseSection />
            <AbilitySection />
            <CommentSection />
            <ContactSection />
        </main>
    )
}
