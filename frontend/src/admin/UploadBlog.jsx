import { useState } from "react";
import API from "../services/api";

export default function UploadBlog() {
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      await API.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog uploaded successfully");
      e.target.reset();
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Upload New Blog</h1>

      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        <input
          name="title"
          placeholder="Blog Title"
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Blog Description"
          className="w-full border p-3 rounded h-32"
          required
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          className="w-full border p-3 rounded"
        />

        <input
          type="file"
          name="image"
          className="w-full"
          accept="image/*"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Upload Blog"}
        </button>
      </form>
    </div>
  );
}
