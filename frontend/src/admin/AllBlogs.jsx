import { useEffect, useState } from "react";
import API from "../services/api";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("recent");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/admin/blogs");
      setBlogs(res.data);
    } catch (error) {
      alert("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await API.delete(`/admin/blogs/${id}`);
      alert("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const toggleStatus = async (id) => {
    try {
      await API.put(`/admin/blogs/${id}/status`);
      fetchBlogs();
    } catch (error) {
      alert("Update status failed");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "40px", fontFamily: "'Poppins', sans-serif" }}>Loading blogs...</p>;
  }

  const filteredBlogs = blogs.filter((blog) => {
    const blogDate = new Date(blog.createdAt);
    const today = new Date();

    if (filter === "today") {
      return blogDate.toDateString() === today.toDateString();
    }
    if (filter === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      return blogDate.toDateString() === yesterday.toDateString();
    }
    return true;
  });

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px", fontFamily: "'Poppins', sans-serif" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px", color: "#1f2937" }}>📚 All Blogs</h1>

      {/* ✅ Filter Bar */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <button style={filterBtn("#4f46e5", "#9333ea")} onClick={() => setFilter("recent")}>Recent</button>
        <button style={filterBtn("#059669", "#14b8a6")} onClick={() => setFilter("today")}>Today</button>
        <button style={filterBtn("#ec4899", "#ef4444")} onClick={() => setFilter("yesterday")}>Yesterday</button>
      </div>

      {/* ✅ Blog Cards Grid (4 per row on desktop) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {/* Blog Image */}
            {blog.image ? (
              <img
                src={
                  blog.image.startsWith("uploads/")
                    ? `http://localhost:5000/${blog.image}`
                    : `http://localhost:5000/uploads/${blog.image}`
                }
                alt={blog.title}
                style={{ height: "160px", width: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ height: "160px", display: "flex", alignItems: "center", justifyContent: "center", background: "#d1d5db", color: "#6b7280" }}>
                No Image
              </div>
            )}

            {/* Blog Content */}
            <div style={{ padding: "16px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", color: "#111827" }}>{blog.title}</h2>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
                By {blog.author?.name || "Unknown"} • {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p style={{ fontSize: "15px", color: "#374151", marginBottom: "12px" }}>
                {blog.description || "No description available..."}
              </p>

              {/* Status Badge */}
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  background: blog.status === "published" ? "#bbf7d0" : "#fecaca",
                  color: blog.status === "published" ? "#166534" : "#991b1b",
                }}
              >
                {blog.status === "published" ? "Published" : "Hidden"}
              </span>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => toggleStatus(blog._id)} style={actionBtn("#2563eb")}>Update</button>
                <button onClick={() => deleteBlog(blog._id)} style={actionBtn("#dc2626")}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ✅ Helper Styles */
const filterBtn = (from, to) => ({
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  background: `linear-gradient(to right, ${from}, ${to})`,
  color: "white",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
  transition: "transform 0.3s ease",
});
const actionBtn = (color) => ({
  flex: 1,
  background: color,
  border: "none",
  color: "white",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "13px",
  transition: "all 0.3s ease",
});
