import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return <p style={{ textAlign: "center", marginTop: "40px", fontFamily: "'Poppins', sans-serif" }}>Loading dashboard...</p>;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px", fontFamily: "'Poppins', sans-serif" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px", color: "#1f2937" }}>
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <Card title="Total Users" value={stats.totalUsers} color="#2563eb" />
        <Card title="Total Blogs" value={stats.totalBlogs} color="#059669" />
        <Card title="Published Blogs" value={stats.publishedBlogs} color="#f59e0b" />
        <Card title="Hidden Blogs" value={stats.hiddenBlogs} color="#dc2626" />
      </div>

      {/* Chart Placeholder */}
      <div style={{ background: "white", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "12px", padding: "20px", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>📊 Blog Activity (Chart)</h2>
        <div style={{ height: "250px", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: "16px" }}>
          Chart Placeholder
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ background: "white", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "12px", padding: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>🕒 Recent Activity</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#374151", fontSize: "15px" }}>
          <li style={activityItem}>✔️ New blog uploaded by Admin</li>
          <li style={activityItem}>✔️ User registered successfully</li>
          <li style={activityItem}>✔️ Blog status updated (Published → Hidden)</li>
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ fontSize: "16px", marginBottom: "8px", fontWeight: "500" }}>{title}</h3>
      <p style={{ fontSize: "28px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

/* ✅ Helper Styles */
const activityItem = {
  background: "#f3f4f6",
  padding: "10px 14px",
  borderRadius: "8px",
  marginBottom: "8px",
  transition: "all 0.3s ease",
};
