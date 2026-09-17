import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import DashboardViewer from "./components/DashboardViewer";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    // Read from URL hash if available (e.g. #orders)
    const hash = window.location.hash.replace("#", "").toLowerCase();
    const validTabs = ["overview", "orders", "inventory", "couriers", "analytics", "customers", "messages"];
    return validTabs.includes(hash) ? hash : "overview";
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [modalType, setModalType] = useState(null); // 'profile', 'settings'

  // Update URL hash when activeTab changes
  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if typing in an input
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      if (e.key === "1") handleSelectTab("overview");
      if (e.key === "2") handleSelectTab("orders");
      if (e.key === "3") handleSelectTab("inventory");
      if (e.key === "4") handleSelectTab("couriers");
      if (e.key === "5") handleSelectTab("analytics");
      if (e.key === "[") setIsCollapsed((prev) => !prev);
      if (e.key === "Escape") setModalType(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="app-shell">
      {/* Interactive Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        onOpenProfile={() => setModalType("profile")}
        onOpenSettings={(section) => setModalType(section || "settings")}
      />

      {/* Main Dashboard Canvas & Image Viewer */}
      <DashboardViewer
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Generic Modal for Profile / Settings */}
      {modalType && (
        <div className="app-modal-overlay" onClick={() => setModalType(null)}>
          <div className="app-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <h3>{modalType === "profile" ? "Seller Profile" : "Seller Settings"}</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalType(null)}
              >
                &times;
              </button>
            </div>
            <div className="app-modal-body">
              <div className="modal-business-card">
                <div className="business-avatar">V</div>
                <div>
                  <h4>Vendly Store</h4>
                  <p>Role: Store Owner &bull; Sri Lanka</p>
                  <span className="business-badge">Verified Merchant</span>
                </div>
              </div>
              <p className="modal-note">
                Configure store credentials, logistics integrations, and payment gateways for your Vendly account.
              </p>
            </div>
            <div className="app-modal-footer">
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() => setModalType(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
