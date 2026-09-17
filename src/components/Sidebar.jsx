import { useState, useRef, useEffect } from "react";
import "./Sidebar.css";
import vendlyLogo from "../assets/vendly-logo.png";
import vendlyCollapsedLogo from "../assets/Vendlylogofinal.png";
import {
  LayoutDashboard,
  ClipboardList,
  Box,
  Truck,
  Users,
  MessageSquare,
  ChartNoAxesCombined,
  Store,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  UserRound,
  UsersRound,
  Sparkles,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

export const NAVIGATION_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, badge: null },
  { id: "orders", label: "Orders", icon: ClipboardList, badge: "12" },
  { id: "inventory", label: "Inventory", icon: Box, badge: "32" },
  { id: "couriers", label: "Couriers", icon: Truck, badge: "1" },
  { id: "analytics", label: "Analytics", icon: ChartNoAxesCombined, badge: "Live" },
  { id: "customers", label: "Customers", icon: Users, badge: "9" },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: null },
];

function Sidebar({
  activeTab = "overview",
  onSelectTab,
  isCollapsed = false,
  onToggleCollapse,
  onOpenProfile,
  onOpenSettings,
}) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    function closeProfileMenu(e) {
      if (!profileMenuRef.current?.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", closeProfileMenu);
    return () => document.removeEventListener("pointerdown", closeProfileMenu);
  }, []);

  const businessName = "Vendly";
  const sellerRole = "Owner";

  return (
    <aside
      id="sidebar-navigation"
      className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""}`}
    >
      {/* Sidebar Header: Logo & Collapse Button */}
      <div className="sidebar__top">
        <div
          className="sidebar__logo-wrapper"
          onClick={() => onSelectTab && onSelectTab("overview")}
          title="Vendly Seller Dashboard"
          role="button"
          tabIndex={0}
        >
          <img
            className="sidebar__logo-image"
            src={isCollapsed ? vendlyCollapsedLogo : vendlyLogo}
            alt="Vendly"
          />
        </div>
        {!isCollapsed && (
          <small className="sidebar__subtitle">Seller Dashboard</small>
        )}

        {onToggleCollapse && (
          <button
            type="button"
            className="sidebar__collapse-toggle"
            onClick={onToggleCollapse}
            title={isCollapsed ? "Expand Sidebar (Hotkey: [ )" : "Collapse Sidebar (Hotkey: [ )"}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        )}
      </div>

      {/* Main navigation links */}
      <nav className="sidebar__navigation" aria-label="Main Navigation">
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              type="button"
              key={item.id}
              className={`sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
              onClick={() => onSelectTab && onSelectTab(item.id)}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.6 : 2.2} />
              <span className="sidebar__label">{item.label}</span>
              {item.badge && !isCollapsed && (
                <span className={`sidebar__badge ${isActive ? "sidebar__badge--active" : ""}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Business switcher & profile anchor */}
      <div className="sidebar__footer" ref={profileMenuRef}>
        {isProfileMenuOpen && (
          <div className="sidebar__profile-menu" role="menu">
            <button
              type="button"
              onClick={() => {
                setIsProfileMenuOpen(false);
                if (onOpenProfile) onOpenProfile();
              }}
              role="menuitem"
            >
              <UserRound size={15} /> My Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setIsProfileMenuOpen(false);
                if (onOpenSettings) onOpenSettings("staff");
              }}
              role="menuitem"
            >
              <UsersRound size={15} /> Staff & permissions
            </button>
            <button
              type="button"
              onClick={() => {
                setIsProfileMenuOpen(false);
                if (onOpenSettings) onOpenSettings("plan");
              }}
              role="menuitem"
            >
              <Sparkles size={15} /> Current plan
            </button>
            <button
              type="button"
              onClick={() => {
                setIsProfileMenuOpen(false);
                if (onOpenSettings) onOpenSettings("billing");
              }}
              role="menuitem"
            >
              <CreditCard size={15} /> Billing
            </button>
            <button
              type="button"
              onClick={() => {
                setIsProfileMenuOpen(false);
                if (onOpenSettings) onOpenSettings("general");
              }}
              role="menuitem"
            >
              <Settings size={15} /> All settings
            </button>
            <button
              className="sidebar__profile-menu-danger"
              type="button"
              onClick={() => {
                setIsProfileMenuOpen(false);
                alert("Logged out from Vendly Seller session");
              }}
              role="menuitem"
            >
              <LogOut size={15} /> Log out
            </button>
          </div>
        )}

        <button
          className="sidebar__business"
          type="button"
          onClick={() => setIsProfileMenuOpen((curr) => !curr)}
          title={isCollapsed ? businessName : undefined}
          aria-haspopup="menu"
          aria-expanded={isProfileMenuOpen}
        >
          <span className="sidebar__business-icon">
            <Store size={18} aria-hidden="true" />
          </span>

          <span className="sidebar__business-details sidebar__label">
            <strong>{businessName}</strong>
            <small>{sellerRole}</small>
          </span>

          <ChevronRight
            className={`sidebar__business-arrow ${isProfileMenuOpen ? "is-open" : ""}`}
            size={16}
            aria-hidden="true"
          />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
