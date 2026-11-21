import { HeroSection } from "./components/HeroSection";
import { NewsSection } from "./components/NewsSection";
import { CharacterSection } from "./components/CharacterSection";
import { FeaturesSection } from "./components/FeaturesSection";

export function App() {
  return (
    <main className="min-h-screen w-full">
      <HeroSection />
      <NewsSection />
      <CharacterSection />
      <FeaturesSection />

      {/* Upcoming sections tracked in prd.md */}
      <div id="community" className="sr-only" aria-hidden="true" />
    </main>
  );
}

export default App;
