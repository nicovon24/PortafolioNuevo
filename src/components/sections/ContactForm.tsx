"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const inputClass =
  "w-full rounded-xl border border-line bg-[rgba(8,17,31,0.88)] px-3.5 py-2.5 font-sans text-sm text-ink placeholder:text-muted/65 outline-none transition-[border-color,box-shadow] focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_rgba(100,255,218,0.14)]";

const labelClass = "mb-1.5 block font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent";

const btnSubmit =
  "inline-flex min-h-10 shrink-0 items-center justify-center gap-2 border border-accent bg-accent px-3.5 font-mono text-sm font-bold uppercase tracking-wider text-background-deep shadow-[0_0_0_1px_rgba(100,255,218,0.35)_inset,0_0_24px_rgba(100,255,218,0.12)] transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2 disabled:opacity-50 disabled:cursor-not-allowed";

export default function ContactForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          subject: subject || t("contact.form.defaultSubject"),
          message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate suppressHydrationWarning>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="contact-name">
            {t("contact.form.name")}
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
            placeholder={t("contact.form.namePlaceholder")}
            suppressHydrationWarning
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-email">
            {t("contact.form.email")}
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
            placeholder={t("contact.form.emailPlaceholder")}
            suppressHydrationWarning
          />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-subject">
          {t("contact.form.subject")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
          placeholder={t("contact.form.subjectPlaceholder")}
          suppressHydrationWarning
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-message">
          {t("contact.form.message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} min-h-[8.5rem] resize-y`}
          placeholder={t("contact.form.messagePlaceholder")}
          suppressHydrationWarning
        />
      </div>
      <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className={btnSubmit} disabled={status === "sending"} suppressHydrationWarning>
          {status === "sending" ? t("contact.form.sending", "Enviando…") : t("contact.form.submit")} <Send size={16} />
        </button>
        {status === "success" && (
          <p className="font-mono text-xs text-accent">{t("contact.form.success", "¡Mensaje enviado!")}</p>
        )}
        {status === "error" && (
          <p className="font-mono text-xs text-accent-2">{t("contact.form.error", "Error al enviar. Intentá de nuevo.")}</p>
        )}
      </div>
    </form>
  );
}
