
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "'Roboto', sans-serif",
      background: "#fafafa",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      backgroundColor: "white",
      width: "100%",
      maxWidth: "400px",
      padding: "3rem 2rem",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    heading: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#333",
      marginBottom: "0.5rem",
    },
    subHeading: {
      fontSize: "1rem",
      color: "#888",
      marginBottom: "2rem",
    },
    button: {
      backgroundColor: "#4285F4",
      color: "white",
      border: "none",
      padding: "14px 24px",
      borderRadius: "5px",
      fontSize: "1rem",
      cursor: "pointer",
      width: "100%",
      transition: "background-color 0.3s",
      marginBottom: "10px",
    },
    buttonHover: {
      backgroundColor: "#357ae8",
    },
    footer: {
      marginTop: "20px",
      color: "#777",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign In</h2>
        <p style={styles.subHeading}>Please login to continue to your dashboard</p>

        <GoogleLogin
          onSuccess={(res) => {
            const decoded = jwtDecode(res.credential);
            console.log("Decoded User:", decoded);
            localStorage.setItem("user", res.credential);
            navigate("/home", { state: { user: decoded } });
          }}
          onError={() => {
            console.log("Login failed");
          }}
          useOneTap
          style={styles.button}
        />
        <div style={styles.footer}>By logging in, you agree to our Terms of Service and Privacy Policy</div>
      </div>
    </div>
  );
}

export default Login;
