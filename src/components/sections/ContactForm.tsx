"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { profile } from "@/data/portfolio";

const inputClass =
  "w-full rounded-xl border border-line bg-[rgba(8,17,31,0.88)] px-3.5 py-2.5 font-sans text-sm text-ink placeholder:text-muted/65 outline-none transition-[border-color,box-shadow] focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_rgba(100,255,218,0.14)]";

const labelClass = "mb-1.5 block font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent";

/** Mismo estilo que el CTA primario del hero (“Ver proyectos”). */
const btnSubmit =
  "inline-flex min-h-10 shrink-0 items-center justify-center gap-2 border border-accent bg-accent px-3.5 font-mono text-sm font-bold uppercase tracking-wider text-background-deep shadow-[0_0_0_1px_rgba(100,255,218,0.35)_inset,0_0_24px_rgba(100,255,218,0.12)] transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [`Nombre: ${name}`, `Email: ${email}`, "", message].join("\n");
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject || "Contacto desde el portfolio")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate suppressHydrationWarning>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="contact-name">
            Nombre
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Tu nombre"
            suppressHydrationWarning
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="nombre@ejemplo.com"
            suppressHydrationWarning
          />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-subject">
          Asunto
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
          placeholder="Asunto del mensaje"
          suppressHydrationWarning
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-message">
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} min-h-[8.5rem] resize-y`}
          placeholder="Contame en qué puedo ayudarte..."
          suppressHydrationWarning
        />
      </div>
      <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className={btnSubmit} suppressHydrationWarning>
          Enviar <Send size={16} />
        </button>
      </div>
    </form>
  );
}
