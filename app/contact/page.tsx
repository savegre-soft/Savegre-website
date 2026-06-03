"use client";

import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    detail: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.email || !form.subject || !form.detail) return;
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen bg-neutral-950 text-neutral-100 px-8 py-16"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&display=swap');

        .input-field {
          width: 100%;
          padding: 12px 16px;
          background: #0a0a0a;
          border: 1px solid #262626;
          color: #f5f5f5;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field::placeholder { color: #525252; }
        .input-field:focus { border-color: #1d4ed8; }

        .submit-btn {
          padding: 14px 32px;
          background: #1d4ed8;
          color: white;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .submit-btn:hover { background: #1e40af; }
        .submit-btn:active { transform: scale(0.98); }
        .submit-btn:disabled { background: #1e3a6e; cursor: not-allowed; opacity: 0.6; }

        .contact-card {
          border: 1px solid #1f1f1f;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: border-color 0.2s;
        }
        .contact-card:hover { border-color: #1d4ed8; }

        .success-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #052e16;
          border: 1px solid #14532d;
          color: #86efac;
          padding: 10px 20px;
          font-size: 13px;
          margin-top: 8px;
        }
      `}</style>

      {/* Header */}
      <div className="border-b border-neutral-800 pb-10 mb-12">
        <span
          className="text-xs text-blue-600 font-medium block mb-4"
          style={{ letterSpacing: "0.25em", textTransform: "uppercase" }}
        >
          Ingeniería de Software — Contacto
        </span>

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "white",
            marginBottom: "16px",
          }}
        >
          Contacta con Nuestro Equipo
        </h1>

        <p className="text-neutral-400 leading-relaxed max-w-xl text-sm font-light">
          Si tienes un proyecto en mente o simplemente quieres saber más sobre
          cómo podemos ayudarte, no dudes en ponerte en contacto. Estamos aquí
          para escuchar tus ideas y convertirlas en realidad.
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Form */}
        <div className="flex-1 max-w-lg">
          <h2
            className="text-white mb-8"
            style={{ fontSize: "18px", fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            Envía una consulta
          </h2>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="fullName" className="text-xs text-neutral-400" style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Nombre Completo
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="input-field"
                  placeholder="Ana García"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="email" className="text-xs text-neutral-400" style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  placeholder="ana@empresa.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs text-neutral-400" style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Asunto
              </label>
              <input
                id="subject"
                type="text"
                className="input-field"
                placeholder="Desarrollo de Software"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="detail" className="text-xs text-neutral-400" style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Detalle
              </label>
              <textarea
                id="detail"
                className="input-field"
                placeholder="Cuéntanos sobre tu proyecto..."
                rows={5}
                style={{ resize: "vertical" }}
                value={form.detail}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={submitted}
              >
                {submitted ? "Mensaje enviado" : "Enviar consulta →"}
              </button>

              {submitted && (
                <div className="success-badge">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Recibirás una respuesta en 24–48 h
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6 lg:w-72">
          <h2
            className="text-white"
            style={{ fontSize: "18px", fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            Información de Contacto
          </h2>

          {/* Ubicación */}
          <div className="contact-card">
            <div className="flex items-center gap-3 mb-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 1.5C6.51 1.5 4.5 3.51 4.5 6c0 3.75 4.5 10.5 4.5 10.5s4.5-6.75 4.5-10.5c0-2.49-2.01-4.5-4.5-4.5z"/>
                <circle cx="9" cy="6" r="1.5"/>
              </svg>
              <h3 className="text-white text-sm font-medium">Ubicación</h3>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              San José, Costa Rica
            </p>
            <p className="text-neutral-600 text-xs">
              Zona horaria: CST (UTC-6)
            </p>
          </div>

          {/* Contacto Directo */}
          <div className="contact-card">
            <div className="flex items-center gap-3 mb-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1.5" y="3.5" width="15" height="11" rx="1"/>
                <path d="M1.5 5L9 10.5 16.5 5"/>
              </svg>
              <h3 className="text-white text-sm font-medium">Contacto Directo</h3>
            </div>
            <a
              href="mailto:hola@equipo.dev"
              className="text-blue-500 text-sm hover:text-blue-400 transition-colors"
            >
              hola@equipo.dev
            </a>
            <p className="text-neutral-600 text-xs mt-1">
              Respondemos en 24–48 horas hábiles
            </p>
          </div>

          {/* Horario */}
          <div className="contact-card">
            <div className="flex items-center gap-3 mb-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="9" r="7.5"/>
                <path d="M9 5v4l2.5 2.5"/>
              </svg>
              <h3 className="text-white text-sm font-medium">Horario</h3>
            </div>
            <p className="text-neutral-400 text-sm">Lun – Vie: 8:00 am – 6:00 pm</p>
            <p className="text-neutral-600 text-xs mt-1">Fines de semana: cerrado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;