import "./Sidebar.css";
import vendlyLogo from "../assets/vendly-logo.png";
import {
  LayoutGrid,
  ClipboardList,
  Box,
  Truck,
  Users,
  MessageSquare,
  BarChart2,
  Store,
  ChevronRight,
} from "lucide-react";

export const navigationItems = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "inventory", label: "Inventory", icon: Box },
  { id: "couriers", label: "Couriers", icon: Truck },
  { id: "customers", label: "Customers", icon: Users },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
];

function Sidebar({ activeTab = "overview", onSelectTab }) {
  return (
    <aside id="sidebar-navigation" className="sidebar">
      {/* Brand logo and dashboard subtitle */}
      <div className="sidebar__top">
        <div
          className="sidebar__logo"
          onClick={() => onSelectTab && onSelectTab("overview")}
          role="button"
          tabIndex={0}
        >
          <img
            className="sidebar__logo-image"
            src={vendlyLogo}
            alt="Vendly.lk"
          />
        </div>
        <small className="sidebar__subtitle">Seller Dashboard</small>
      </div>

      {/* Main navigation links */}
      <nav className="sidebar__navigation" aria-label="Sidebar Navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              type="button"
              key={item.id}
              className={`sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
              onClick={() => onSelectTab && onSelectTab(item.id)}
            >
              <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
              <span className="sidebar__label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Business switcher anchored at the bottom */}
      <div className="sidebar__footer">
        <button className="sidebar__business" type="button">
          <span className="sidebar__business-icon">
            <Store size={15} aria-hidden="true" />
          </span>

          <span className="sidebar__business-details">
            <strong>Vendly</strong>
            <small>Owner</small>
          </span>

          <ChevronRight
            className="sidebar__business-arrow"
            size={14}
            aria-hidden="true"
          />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
