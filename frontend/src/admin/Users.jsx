import { useEffect, useState } from "react";
import API from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, role) => {
    try {
      await API.put(
        `/admin/users/${id}/role`,   // ✅ FIXED: /role added
        { role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUsers();
    } catch (error) {
      alert("Failed to update role");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  {user.role === "user" ? (
                    <button
                      onClick={() => changeRole(user._id, "admin")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => changeRole(user._id, "user")}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
