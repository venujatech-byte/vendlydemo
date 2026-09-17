import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import overviewImg from "./assets/pages/overview.png";
import ordersImg from "./assets/pages/orders.png";
import inventoryImg from "./assets/pages/inventory.png";
import couriersImg from "./assets/pages/couriers.png";
import analyticsImg from "./assets/pages/analytics.png";
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

// Preload all dashboard images
Object.values(PAGE_IMAGES).forEach((src) => {
  const img = new Image();
  img.src = src;
});

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
  };

  const currentImage = PAGE_IMAGES[activeTab] || overviewImg;

  return (
    <div className="app-layout">
      {/* Sidebar matching exact design */}
      <Sidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Right side page image fitting seamlessly */}
      <main className="dashboard-content">
        <img
          key={activeTab}
          src={currentImage}
          alt={`${activeTab} dashboard page`}
          className="dashboard-page-image"
        />
      </main>
    </div>
  );
}

export default App;
