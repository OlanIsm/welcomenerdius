import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import { NewsSection } from "./components/NewsSection";
import { CharacterSection } from "./components/CharacterSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { EndingAndFooter } from "./components/EndingAndFooter";
import { LoadingScreen } from "./components/LoadingScreen";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "./pages/TermsOfServicePage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <main className="min-h-screen w-full">
      <LoadingScreen />
      <HeroSection />
      <NewsSection />
      <CharacterSection />
      <FeaturesSection />
      <EndingAndFooter />
    </main>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
