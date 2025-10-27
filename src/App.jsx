import HeroSection from "./components/HeroSection";
import TryOnUploader from "./components/TryOnUploader";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-fuchsia-50/40 to-white text-gray-900">
      <HeroSection />
      <TryOnUploader />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;
