import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const res = await API.post("/auth/login", {
        email: form.email.value,
        password: form.password.value,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login Success");
      navigate("/blogs");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9fafb",
        padding: "24px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <form
        onSubmit={submitHandler}
        style={{
          width: "100%",
          maxWidth: "520px",          // 🔥 bigger card
          background: "white",
          padding: "48px 44px",       // 🔥 more spacing
          borderRadius: "20px",
          boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            fontSize: "32px",          // 🔥 bigger heading
            fontWeight: "700",
            textAlign: "center",
            color: "#111827",
            marginBottom: "32px",
          }}
        >
          Welcome Back 👋
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            style={{
              padding: "16px 18px",    // 🔥 bigger inputs
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
            }}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            style={{
              padding: "16px 18px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "32px",
            padding: "16px",
            borderRadius: "10px",
            background: "linear-gradient(to right, #6366f1, #a855f7)",
            color: "white",
            fontWeight: "600",
            fontSize: "17px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login Now
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "15px",
            color: "#6b7280",
            marginTop: "24px",
          }}
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#6366f1",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
