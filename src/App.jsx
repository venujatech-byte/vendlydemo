import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import overviewImg from "./assets/pages/overview.png";
import ordersImg from "./assets/pages/orders.png";
import inventoryImg from "./assets/pages/inventory.png";
import couriersImg from "./assets/pages/couriers.png";
import analyticsImg from "./assets/pages/analytics.png";
import { Maximize2, Minimize2 } from "lucide-react";
import "./App.css";

const PAGE_IMAGES = {
  overview: overviewImg,
  orders: ordersImg,
  inventory: inventoryImg,
  couriers: couriersImg,
  analytics: analyticsImg,
  customers: overviewImg,
  messages: overviewImg,
};

// Preload all dashboard images for instant switching
Object.values(PAGE_IMAGES).forEach((src) => {
  const img = new Image();
  img.src = src;
});

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  // 'contain' = fits entirely on screen keeping original aspect ratio
  // 'width' = fills full width keeping original aspect ratio (scrollable)
  const [fitMode, setFitMode] = useState("contain");

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
  };

  const currentImage = PAGE_IMAGES[activeTab] || overviewImg;

  // Hotkeys: 1-5 for tabs, 'F' to toggle fit mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "1") setActiveTab("overview");
      if (e.key === "2") setActiveTab("orders");
      if (e.key === "3") setActiveTab("inventory");
      if (e.key === "4") setActiveTab("couriers");
      if (e.key === "5") setActiveTab("analytics");
      if (e.key.toLowerCase() === "f") {
        setFitMode((prev) => (prev === "contain" ? "width" : "contain"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="app-layout">
      {/* Sidebar matching exact design */}
      <Sidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Right side page image strictly keeping original aspect ratio */}
      <main className={`dashboard-content ${fitMode === "width" ? "dashboard-content--scroll" : ""}`}>
        <img
          key={activeTab}
          src={currentImage}
          alt={`${activeTab} dashboard page`}
          className={`dashboard-page-image ${fitMode === "width" ? "img-fill-width" : "img-fit-contain"}`}
        />

        {/* Subtle floating toggle for fit mode */}
        <button
          type="button"
          className="fit-mode-toggle"
          onClick={() => setFitMode(fitMode === "contain" ? "width" : "contain")}
          title={fitMode === "contain" ? "Switch to Fill Width (Hotkey: F)" : "Switch to Fit Screen (Hotkey: F)"}
        >
          {fitMode === "contain" ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          <span>{fitMode === "contain" ? "Fit Screen (1:1 Ratio)" : "Fill Width (1:1 Ratio)"}</span>
        </button>
      </main>
    </div>
  );
}

export default App;
