import { useNavigate } from "react-router-dom";
import API from "../services/api";
import registerimg from "../assets/registerimage-removebg-preview.png";

export default function Register() {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      await API.post("/auth/register", {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
      });

      alert("Registered Successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      {/* Left Side Image */}
      <div className="register-image">
        <img src={registerimg} alt="Register Illustration" />
      </div>

      {/* Right Side Form */}
      <div className="register-form">
        <form onSubmit={submitHandler}>
<h2
  style={{
    fontFamily: "Poppins, Arial, sans-serif",
    fontSize: "22px",
    fontWeight: "900",
    textAlign: "center",
    background: "linear-gradient(to right, #6366f1, #a855f7, #ec4899)", // gradient text
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1px",
    marginBottom: "24px",
    textShadow: "0 2px 6px rgba(0,0,0,0.15)", // subtle glow
  }}
>
  Create Blog Account
</h2>

          <div className="inputs">
            <input name="name" placeholder="Full Name" required />
            <input name="email" type="email" placeholder="Email Address" required />
            <input name="password" type="password" placeholder="Password" required />
          </div>

          <button type="submit">Register Now</button>

          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>

      {/* ✅ RESPONSIVE FIX (UI ONLY) */}
      <style>
        {`
        .register-wrapper{
          min-height:100vh;
          display:flex;
          flex-direction:row;
          background:#f9fafb;
          font-family:'Poppins', sans-serif;
        }

        .register-image{
          flex:1;
        }
        .register-image img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        }

        .register-form{
          flex:1;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:40px;
        }

        form{
          width:100%;
          max-width:420px;
          background:white;
          padding:40px;
          border-radius:16px;
          box-shadow:0 8px 20px rgba(0,0,0,0.1);
        }

        h2{
          font-size:28px;
          font-weight:700;
          text-align:center;
          color:#111827;
          margin-bottom:24px;
        }

        .inputs{
          display:flex;
          flex-direction:column;
          gap:16px;
        }

        input{
          padding:12px 16px;
          border-radius:8px;
          border:1px solid #d1d5db;
        }

        button{
          width:100%;
          margin-top:24px;
          padding:14px;
          border-radius:8px;
          background:linear-gradient(to right, #6366f1, #a855f7);
          color:white;
          font-weight:600;
          font-size:16px;
          cursor:pointer;
          border:none;
        }

        p{
          text-align:center;
          font-size:14px;
          color:#6b7280;
          margin-top:20px;
        }

        p span{
          color:#6366f1;
          font-weight:600;
          cursor:pointer;
          text-decoration:underline;
        }

        /* 🔥 MOBILE RESPONSIVE */
        @media (max-width:768px){
          .register-wrapper{
            flex-direction:column;
          }

          .register-image{
            height:220px;
          }

          .register-form{
            padding:20px;
          }

          form{
            max-width:100%;
            padding:24px;
          }
        }
        `}
      </style>
    </div>
  );
}
