import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { LayoutDashboard, Package, ShoppingBag, Tag, MessageSquare, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/admin/products", label: "Products", icon: <Package size={20} /> },
    { path: "/admin/orders", label: "Orders", icon: <ShoppingBag size={20} /> },
    { path: "/admin/categories", label: "Categories", icon: <Tag size={20} /> },
    { path: "/admin/contacts", label: "Messages", icon: <MessageSquare size={20} /> },
  ];

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5F5F5" }}>
      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? "240px" : "70px", background: "#1A1A1A", color: "#FFFFFF", display: "flex", flexDirection: "column", transition: "width 0.3s ease", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {sidebarOpen && <span style={{ color: "#FF6B35", fontWeight: 700, fontSize: "1.1rem" }}>KigaliEats Admin</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "transparent", border: "none", color: "#FFFFFF", cursor: "pointer", padding: "0.25rem" }}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav style={{ flex: 1, padding: "1rem 0" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1.25rem", color: isActive ? "#FF6B35" : "#AAAAAA", textDecoration: "none", background: isActive ? "rgba(255,107,53,0.1)" : "transparent", borderLeft: isActive ? "3px solid #FF6B35" : "3px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap", overflow: "hidden" }}
              >
                {item.icon}
                {sidebarOpen && <span style={{ fontWeight: isActive ? 600 : 400 }}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {sidebarOpen && <p style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: "#AAAAAA" }}>{user?.name}</p>}
          <button
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "transparent", border: "none", color: "#EF4444", cursor: "pointer", padding: "0.5rem 0", width: "100%" }}
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;