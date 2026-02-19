import { useEffect, useState } from "react";
import API from "../services/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("recent");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
      alert("Blog deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/admin/update-blog/${id}`;
  };

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

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading blogs...</p>;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>
        📚 All Blogs
      </h1>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setFilter("recent")} style={{ padding: "8px 16px", borderRadius: "6px", border: "none", background: "linear-gradient(to right, #4f46e5, #9333ea)", color: "white", cursor: "pointer" }}>Recent</button>
        <button onClick={() => setFilter("today")} style={{ padding: "8px 16px", borderRadius: "6px", border: "none", background: "linear-gradient(to right, #059669, #14b8a6)", color: "white", cursor: "pointer" }}>Today</button>
        <button onClick={() => setFilter("yesterday")} style={{ padding: "8px 16px", borderRadius: "6px", border: "none", background: "linear-gradient(to right, #ec4899, #ef4444)", color: "white", cursor: "pointer" }}>Yesterday</button>
      </div>

      {/* Blog Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filteredBlogs.map((blog) => (
          <div key={blog._id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "16px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", background: "linear-gradient(to bottom right, #f9fafb, #e5e7eb)" }}>
            {blog.image && (
              <img
                src={`http://localhost:5000/uploads/${blog.image}`}
                alt={blog.title}
                style={{ height: "160px", width: "100%", objectFit: "cover", borderRadius: "8px", marginBottom: "12px" }}
              />
            )}

            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px", color: "#111" }}>{blog.title}</h2>
            <p style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
              By {blog.author?.name || "Unknown"} • {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <p style={{ fontSize: "15px", color: "#333", marginBottom: "12px" }}>
              {blog.description.slice(0, 100)}...
            </p>

            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
              {blog.tags?.map((tag, i) => (
                <span key={i} style={{ fontSize: "12px", background: "#e5e7eb", padding: "4px 8px", borderRadius: "6px", color: "#374151" }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => handleUpdate(blog._id)} style={{ flex: 1, background: "#424769", color: "white", padding: "8px", borderRadius: "6px", border: "none", cursor: "pointer" }}>Show Details</button>
              {/* <button onClick={() => handleDelete(blog._id)} style={{ flex: 1, background: "#dc2626", color: "white", padding: "8px", borderRadius: "6px", border: "none", cursor: "pointer" }}>Continue</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
