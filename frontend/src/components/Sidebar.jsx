import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaBlog, FaUpload, FaUsers } from "react-icons/fa"; // React Icons

export default function Sidebar() {
  const location = useLocation(); // ✅ current URL path

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    fontFamily: "'Poppins', sans-serif",
    padding: "12px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    display: "flex",          // flex for icon + text
    alignItems: "center",
    gap: "8px",               // space between icon and text
  };

  const isActive = (path) => location.pathname === path;

  // Hover effect
  const linkHover = (e) => {
    e.target.style.background = "rgba(255,255,255,0.2)";
    e.target.style.transform = "translateX(8px)";
  };

  // Leave effect
  const linkLeave = (e, path) => {
    if (isActive(path)) {
      e.target.style.background = "rgba(255,255,255,0.2)";
    } else {
      e.target.style.background = "transparent";
    }
    e.target.style.transform = "translateX(0)";
  };

  return (
    <aside
      style={{
        width: "250px",
        background: "linear-gradient(180deg, #020715, #0f172a)",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px",
        boxShadow: "4px 0 12px rgba(0,0,0,0.3)",
        fontFamily: "'Poppins', sans-serif",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "40px",
            textAlign: "center",
            letterSpacing: "1px",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            paddingBottom: "12px",
          }}
        >
          Admin Panel
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Link
            to="/admin/dashboard"
            style={{
              ...linkStyle,
              background: isActive("/admin/dashboard") ? "rgba(255,255,255,0.2)" : "transparent",
            }}
            onMouseEnter={linkHover}
            onMouseLeave={(e) => linkLeave(e, "/admin/dashboard")}
          >
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link
            to="/admin/blogs"
            style={{
              ...linkStyle,
              background: isActive("/admin/blogs") ? "rgba(255,255,255,0.2)" : "transparent",
            }}
            onMouseEnter={linkHover}
            onMouseLeave={(e) => linkLeave(e, "/admin/blogs")}
          >
            <FaBlog /> All Blogs
          </Link>

          <Link
            to="/admin/upload"
            style={{
              ...linkStyle,
              background: isActive("/admin/upload") ? "rgba(255,255,255,0.2)" : "transparent",
            }}
            onMouseEnter={linkHover}
            onMouseLeave={(e) => linkLeave(e, "/admin/upload")}
          >
            <FaUpload /> Upload Blog
          </Link>

          <Link
            to="/admin/users"
            style={{
              ...linkStyle,
              background: isActive("/admin/users") ? "rgba(255,255,255,0.2)" : "transparent",
            }}
            onMouseEnter={linkHover}
            onMouseLeave={(e) => linkLeave(e, "/admin/users")}
          >
            <FaUsers /> Users
          </Link>
        </nav>
      </div>
    </aside>
  );
}
