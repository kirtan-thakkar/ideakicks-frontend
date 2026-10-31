import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle } from "@phosphor-icons/react";
import { Logo } from "../components/layout/Logo";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-20 px-4 md:px-6 lg:px-8"
      style={{ fontFamily: SAT, backgroundColor: "#FFFFFF" }}
    >
      <div style={{ width: "100%", maxWidth: "448px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "0" }}>
          <Link to="/" style={{ display: "inline-block", textDecoration: "none" }}>
            <Logo scale={1.4} color="#082D4D" />
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "1.5rem",
            boxShadow: "0 4px 24px rgba(8,45,77,0.08)",
            border: "1px solid rgba(15,76,130,0.06)",
            padding: "2rem",
            marginTop: "2rem",
          }}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <CheckCircle
                size={40}
                color="#6FD179"
                style={{ margin: "0 auto 1rem" }}
              />
              <h1
                style={{
                  fontFamily: CD,
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  color: "#082D4D",
                  marginBottom: "0.75rem",
                }}
              >
                Check your inbox
              </h1>
              <p
                style={{
                  fontFamily: SAT,
                  color: "rgba(8,45,77,0.6)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                }}
              >
                We've sent a reset link to{" "}
                <span style={{ color: "#082D4D", fontWeight: 400 }}>{email}</span>.
              </p>
              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Link
                  to="/login"
                  style={{
                    fontFamily: SAT,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "2.75rem",
                    backgroundColor: "#0F4C82",
                    color: "#fff",
                    borderRadius: "999px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Return to sign in
                </Link>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{
                    fontFamily: SAT,
                    background: "none",
                    border: "none",
                    color: "#0F4C82",
                    fontSize: "0.8125rem",
                    fontWeight: 400,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Try another email
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1
                style={{
                  fontFamily: CD,
                  fontWeight: 400,
                  fontSize: "1.875rem",
                  color: "#082D4D",
                  marginBottom: "0.625rem",
                }}
              >
                Reset your password
              </h1>
              <p
                style={{
                  fontFamily: SAT,
                  color: "rgba(8,45,77,0.6)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                  marginBottom: "1.75rem",
                }}
              >
                Enter your email and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    style={{
                      fontFamily: SAT,
                      fontSize: "0.8rem",
                      fontWeight: 400,
                      color: "rgba(8,45,77,0.55)",
                      display: "block",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    style={{
                      fontFamily: SAT,
                      width: "100%",
                      border: "1px solid rgba(8,45,77,0.14)",
                      borderRadius: "0.625rem",
                      padding: "0.75rem 1rem",
                      fontSize: "0.9375rem",
                      color: "#082D4D",
                      backgroundColor: "#FFFFFF",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    fontFamily: SAT,
                    width: "100%",
                    height: "3rem",
                    backgroundColor: "#0F4C82",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Send reset link
                </button>
              </form>
            </>
          )}
        </div>

        {/* Below card */}
        <p
          style={{
            fontFamily: SAT,
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.875rem",
            color: "rgba(8,45,77,0.5)",
          }}
        >
          Remember your password?{" "}
          <Link
            to="/login"
            style={{ color: "#0F4C82", textDecoration: "none", fontWeight: 400 }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
