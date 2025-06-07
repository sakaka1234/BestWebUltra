import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header.tsx";
import { HeroSection } from "./components/HeroSection.tsx";
import { Networking } from "./components/Networking.tsx";

function AppContent() {
  const location = useLocation();
  // Ẩn Header khi ở trang /login
  const hideHeader = location.pathname.startsWith("/networking");

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/networking/*" element={<Networking />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
