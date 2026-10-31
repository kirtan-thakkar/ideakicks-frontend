import { useState } from "react";
import { Link } from "react-router";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { PublicHeroGradient } from "../components/common/PublicHeroGradient";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: SAT,
    width: "100%",
    border: "1px solid rgba(8,45,77,0.14)",
    borderRadius: "0.625rem",
    padding: "0.75rem 1rem",
    fontSize: "0.9rem",
    color: "#082D4D",
    backgroundColor: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ fontFamily: SAT }}>
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-36 text-center">
        <PublicHeroGradient />
        <div className="container-base relative z-10 max-w-2xl mx-auto">
          <h1 className="heading-hero text-[#082D4D] mb-5">
            Get in touch
          </h1>
          <p className="body-large text-[#082D4D]/68 max-w-xl mx-auto">
            Whether you're a creator with a question, a backer needing support, or press looking for a comment — every request is reviewed by our team.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="bg-white">
        <div className="container-base pt-4 pb-24 max-w-5xl grid lg:grid-cols-2 gap-8 text-left mx-auto">
          {/* Left: form card */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#082D4D]/08 shadow-sm flex flex-col">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <p
                  style={{
                    fontFamily: SAT,
                    color: "#6FD179",
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  Request received!
                </p>
                <p style={{ fontFamily: SAT, color: "rgba(8,45,77,0.6)", fontSize: "0.9375rem" }}>
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4" style={{ marginBottom: "1rem" }}>
                  <div>
                    <label
                      style={{
                        fontFamily: SAT,
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "rgba(8,45,77,0.55)",
                        display: "block",
                        marginBottom: "0.375rem",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontFamily: SAT,
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "rgba(8,45,77,0.55)",
                        display: "block",
                        marginBottom: "0.375rem",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      fontFamily: SAT,
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "rgba(8,45,77,0.55)",
                      display: "block",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, appearance: "none" }}
                  >
                    <option value="">Select a topic…</option>
                    <option value="creator-support">Creator support</option>
                    <option value="backer-support">Backer support</option>
                    <option value="press">Press & media</option>
                    <option value="partnerships">Partnerships</option>
                    <option value="general">General enquiry</option>
                  </select>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      fontFamily: SAT,
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "rgba(8,45,77,0.55)",
                      display: "block",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Note
                  </label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={6}
                    placeholder="How can we help?"
                    required
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    fontFamily: SAT,
                    width: "100%",
                    height: "3rem",
                    backgroundColor: "#082D4D",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "999px",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Send request
                </button>
              </form>
            )}
          </div>

          {/* Right: contact info */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#082D4D]/08 shadow-sm flex flex-col">
            <h3
              style={{
                fontFamily: CD,
                fontWeight: 500,
                fontSize: "1.5rem",
                color: "#082D4D",
                marginBottom: "1.25rem",
              }}
            >
              ideakicks Support
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "0.5rem",
              }}
            >
              <EnvelopeSimple size={16} color="#0F4C82" />
              <a
                href="mailto:hello@ideakicks.com"
                style={{
                  fontFamily: SAT,
                  color: "#0F4C82",
                  fontSize: "0.9375rem",
                  textDecoration: "none",
                }}
              >
                hello@ideakicks.com
              </a>
            </div>
            <p
              style={{
                fontFamily: SAT,
                color: "rgba(8,45,77,0.5)",
                fontSize: "0.875rem",
                marginBottom: "1.5rem",
              }}
            >
              Response within 24 hours on business days
            </p>
            <div
              style={{
                height: "1px",
                backgroundColor: "rgba(8,45,77,0.1)",
                marginBottom: "1.25rem",
              }}
            />
            <p
              style={{
                fontFamily: SAT,
                color: "rgba(8,45,77,0.45)",
                fontSize: "0.875rem",
                marginBottom: "2rem",
              }}
            >
              ideakicks HQ — Lisbon, Portugal
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <Link
                to="/about"
                style={{ fontFamily: SAT, color: "#0F4C82", fontSize: "0.875rem", textDecoration: "none" }}
              >
                About us →
              </Link>
              <Link
                to="/how-it-works"
                style={{ fontFamily: SAT, color: "#0F4C82", fontSize: "0.875rem", textDecoration: "none" }}
              >
                How it works →
              </Link>
              <Link
                to="/pricing"
                style={{ fontFamily: SAT, color: "#0F4C82", fontSize: "0.875rem", textDecoration: "none" }}
              >
                Pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
