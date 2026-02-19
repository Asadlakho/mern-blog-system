import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaBlog, FaTachometerAlt, FaUpload, FaUsers, FaSignOutAlt, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease",
    padding: "10px 14px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const linkHover = (e) => {
    e.target.style.background = "rgba(255,255,255,0.2)";
    e.target.style.transform = "scale(1.05)";
  };

  const linkLeave = (e) => {
    e.target.style.background = "transparent";
    e.target.style.transform = "scale(1)";
  };

  return (
    <nav
      style={{
        background: "#6c2dd2",
        color: "white",
        padding: "12px 24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <h1 style={{ fontSize: "22px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
          <FaBlog /> Blog Management
        </h1>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
          }}
          className="hamburger"
        >
          <FaBars />
        </button>

        {/* Mobile Menu */}
        <div
          style={{
            display: isOpen ? "flex" : "none",
            flexDirection: "column",
            gap: "12px",
            position: "absolute",
            top: "60px",
            right: "24px",
            background: "rgba(30,64,175,0.95)",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
            animation: isOpen ? "slideDown 0.4s ease forwards" : "none",
          }}
          className="mobileMenu"
        >
          <Link to="/blogs" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>
            <FaBlog /> Blogs
          </Link>
          <Link to="/admin/dashboard" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link to="/admin/upload" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>
            <FaUpload /> Upload Blog
          </Link>
          <Link to="/admin/users" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>
            <FaUsers /> Users
          </Link>
          <button
            onClick={handleLogout}
            style={{
              ...linkStyle,
              border: "1px solid white",
              background: "transparent",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "#5f22c1";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "white";
              e.target.style.transform = "scale(1)";
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Desktop Menu */}
        <div style={{ display: "flex", gap: "20px" }} className="desktopMenu">
          <Link to="/blogs" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>
            <FaBlog /> Blogs
          </Link>
          <Link to="/admin/dashboard" style={linkStyle} onMouseEnter={linkHover} onMouseLeave={linkLeave}>
            <FaTachometerAlt /> Dashboard
          </Link>
          
         
          <button
            onClick={handleLogout}
            style={{
              ...linkStyle,
              border: "1px solid white",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              padding: "8px 18px",
              borderRadius: "8px",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "#111827";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "white";
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktopMenu { display: none !important; }
            .hamburger { display: block !important; }
          }

          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </nav>
  );
}
