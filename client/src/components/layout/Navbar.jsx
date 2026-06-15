import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const toggleAccount = () => setAccountOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const linkStyle = (active) => ({
    color: active ? "#FF6B35" : "#FFFFFF",
    textDecoration: "none",
    margin: "0 1rem",
    fontWeight: 500,
    transition: "color 0.2s ease",
  });

  const buttonStyle = {
    border: "1px solid #FFFFFF",
    background: "transparent",
    color: "#FFFFFF",
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: 600,
    marginRight: "0.75rem",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        background: "#1A1A1A",
        color: "#FFFFFF",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1rem",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#FF6B35",
            }}
          />
          <Link to="/" style={{ textDecoration: "none", color: "#FF6B35", fontSize: "1.5rem", fontWeight: "bold" }}>
            KigaliEats
          </Link>
        </div>

        <nav
          style={{
            display: mobileOpen ? "flex" : "none",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#1A1A1A",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 0",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobile}
              style={linkStyle(pathname === item.path)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "none", alignItems: "center" }} className="desktop-only"></div>
          <button
            onClick={toggleMobile}
            style={{
              border: "none",
              background: "transparent",
              color: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link to="/cart" style={{ position: "relative", color: "#FFFFFF", textDecoration: "none" }}>
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -10,
                    background: "#FF6B35",
                    color: "#FFFFFF",
                    borderRadius: "999px",
                    padding: "0 6px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={toggleAccount}
                  style={{
                    border: "1px solid #FFFFFF",
                    background: "transparent",
                    color: "#FFFFFF",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <User size={18} />
                  <span>{user.name}</span>
                  <ChevronDown size={16} />
                </button>
                {accountOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 0.5rem)",
                      background: "#2A2A2A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
                      overflow: "hidden",
                      minWidth: "180px",
                    }}
                  >
                    <Link
                      to="/profile"
                      onClick={() => setAccountOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem 1rem",
                        color: "#FFFFFF",
                        textDecoration: "none",
                      }}
                    >
                      <User size={16} /> My Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setAccountOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.75rem 1rem",
                          color: "#FFFFFF",
                          textDecoration: "none",
                        }}
                      >
                        <LayoutDashboard size={16} /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setAccountOpen(false);
                      }}
                      style={{
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        color: "#FFFFFF",
                        padding: "0.75rem 1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                      }}
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <Link to="/login" style={buttonStyle}>
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    background: "#FF6B35",
                    border: "1px solid #FF6B35",
                    color: "#1A1A1A",
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          nav {
            display: flex !important;
            position: static !important;
            flex-direction: row !important;
            background: transparent !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
