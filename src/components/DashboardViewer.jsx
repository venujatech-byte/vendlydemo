import { useState, useEffect, useRef } from "react";
import "./DashboardViewer.css";

// Dashboard page images
import overviewImg from "../assets/pages/overview.png";
import ordersImg from "../assets/pages/orders.png";
import inventoryImg from "../assets/pages/inventory.png";
import couriersImg from "../assets/pages/couriers.png";
import analyticsImg from "../assets/pages/analytics.png";

import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  Layers,
} from "lucide-react";

export const PAGES_CONFIG = {
  overview: {
    id: "overview",
    title: "Overview",
    subtitle: "Real-time sales, order pipeline, today's work centre and business performance",
    badge: "Live Metrics",
    image: overviewImg,
    alt: "Vendly Business Overview Dashboard",
  },
  orders: {
    id: "orders",
    title: "Orders",
    subtitle: "Manage online orders, shop sales, fulfillment status, waybills and customer dispatches",
    badge: "12 Orders",
    image: ordersImg,
    alt: "Vendly Orders Management Dashboard",
  },
  inventory: {
    id: "inventory",
    title: "Inventory",
    subtitle: "Product catalogs, SKU barcodes, category tracking, pricing and stock health",
    badge: "32 Items",
    image: inventoryImg,
    alt: "Vendly Inventory & Stock Dashboard",
  },
  couriers: {
    id: "couriers",
    title: "Couriers",
    subtitle: "Sri Lanka interactive delivery fee map, district rate comparison and courier logistics",
    badge: "Active Couriers: 1",
    image: couriersImg,
    alt: "Vendly Couriers & Sri Lanka Delivery Map",
  },
  analytics: {
    id: "analytics",
    title: "Analytics",
    subtitle: "Transaction ledger, daily order frequency, 6-month product revenue and margin trends",
    badge: "Updated Now",
    image: analyticsImg,
    alt: "Vendly Sales & Revenue Analytics Dashboard",
  },
  customers: {
    id: "customers",
    title: "Customers",
    subtitle: "Buyer profiles, repeat order rates, lifetime value and customer segmentation",
    badge: "9 Active",
    image: null, // placeholder mockup
    alt: "Vendly Customers Management",
  },
  messages: {
    id: "messages",
    title: "Messages",
    subtitle: "Direct customer inquiries, order support chats, notifications and broadcast updates",
    badge: "Inbox",
    image: null, // placeholder mockup
    alt: "Vendly Messages & Chat",
  },
};

// Preload images immediately
const allImages = [overviewImg, ordersImg, inventoryImg, couriersImg, analyticsImg];
allImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

export default function DashboardViewer({ activeTab = "overview", onSelectTab }) {
  const currentPage = PAGES_CONFIG[activeTab] || PAGES_CONFIG.overview;
  const [zoomLevel, setZoomLevel] = useState(100);
  const [fitMode, setFitMode] = useState("fit-width"); // 'fit-width', 'fit-screen', 'original'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  // Reset zoom when tab changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 15, 180));
    setFitMode("custom");
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 15, 60));
    setFitMode("custom");
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
    setFitMode("fit-width");
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleOpenImage = () => {
    if (currentPage.image) {
      window.open(currentPage.image, "_blank");
    }
  };

  return (
    <div className="viewer-container" ref={containerRef}>
      {/* Top Controls & Breadcrumbs Bar */}
      <header className="viewer-header">
        <div className="viewer-header__breadcrumbs">
          <span className="crumb-root">Vendly</span>
          <ChevronRight size={14} className="crumb-sep" />
          <span className="crumb-section">Seller Portal</span>
          <ChevronRight size={14} className="crumb-sep" />
          <span className="crumb-current">{currentPage.title}</span>
          <span className="crumb-badge">{currentPage.badge}</span>
        </div>

        {/* Quick view switcher pills */}
        <div className="viewer-header__quick-switch">
          {["overview", "orders", "inventory", "couriers", "analytics"].map((tabKey) => {
            const page = PAGES_CONFIG[tabKey];
            const isSelected = activeTab === tabKey;
            return (
              <button
                type="button"
                key={tabKey}
                className={`quick-pill ${isSelected ? "quick-pill--active" : ""}`}
                onClick={() => onSelectTab && onSelectTab(tabKey)}
              >
                {page.title}
              </button>
            );
          })}
        </div>

        {/* Action & Zoom Controls */}
        <div className="viewer-header__actions">
          <div className="zoom-group">
            <button
              type="button"
              className="action-btn"
              onClick={handleZoomOut}
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="zoom-label" onClick={handleResetZoom} title="Reset Zoom">
              {zoomLevel}%
            </span>
            <button
              type="button"
              className="action-btn"
              onClick={handleZoomIn}
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <button
              type="button"
              className={`action-btn ${fitMode === "fit-screen" ? "action-btn--active" : ""}`}
              onClick={() => {
                setFitMode(fitMode === "fit-screen" ? "fit-width" : "fit-screen");
                setZoomLevel(100);
              }}
              title={fitMode === "fit-screen" ? "Switch to Fit Width" : "Switch to Fit Screen"}
            >
              <Layers size={15} />
            </button>
          </div>

          <div className="divider-vert"></div>

          {currentPage.image && (
            <button
              type="button"
              className="action-btn"
              onClick={handleOpenImage}
              title="Open full resolution in new tab"
            >
              <ExternalLink size={16} />
            </button>
          )}

          <button
            type="button"
            className="action-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* Main Image Stage */}
      <main className={`viewer-stage ${fitMode === "fit-screen" ? "viewer-stage--fit-screen" : ""}`}>
        {currentPage.image ? (
          <div
            className={`dashboard-image-wrapper ${isLoading ? "is-loading" : "is-loaded"}`}
            style={{
              transform: fitMode === "custom" ? `scale(${zoomLevel / 100})` : undefined,
              transformOrigin: "top center",
            }}
          >
            <img
              key={currentPage.id}
              src={currentPage.image}
              alt={currentPage.alt}
              className={`dashboard-page-img ${fitMode === "fit-screen" ? "img-fit-screen" : "img-fit-width"}`}
            />
          </div>
        ) : (
          /* Fallback view for other tabs (Customers, Messages) */
          <div className="dashboard-placeholder">
            <div className="placeholder-card">
              <div className="placeholder-icon">
                <Sparkles size={36} />
              </div>
              <h2>{currentPage.title}</h2>
              <p>{currentPage.subtitle}</p>
              <div className="placeholder-tips">
                <Info size={16} />
                <span>
                  Select any of the 5 primary views from the sidebar (Overview, Orders, Inventory, Couriers, Analytics) to view complete interactive dashboard screenshots.
                </span>
              </div>
              <button
                type="button"
                className="placeholder-action-btn"
                onClick={() => onSelectTab && onSelectTab("overview")}
              >
                Go to Overview
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Status Pill */}
      <div className="viewer-statusbar">
        <span className="statusbar-dot"></span>
        <span className="statusbar-text">
          Displaying <strong>{currentPage.title}</strong> &bull; Click sidebar icons to switch pages
        </span>
        <span className="statusbar-shortcut">Press [1-5] to jump</span>
      </div>
    </div>
  );
}
