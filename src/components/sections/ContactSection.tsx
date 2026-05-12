import { Mail, Send } from "lucide-react";
import MotionFade from "@/components/motion/MotionFade";
import Section from "@/components/ui/Section";
import { profile } from "@/data/portfolio";

const btnPrimary =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2.5 rounded-full border border-accent bg-accent px-4 font-bold text-background-deep transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2";

export default function ContactSection() {
  return (
    <Section id="contact" eyebrow="../Contacto" title="Hablemos de tu proximo producto, dashboard o integracion.">
      <MotionFade className="flex flex-col gap-5 rounded-3xl border border-line bg-panel p-6 shadow-[0_20px_56px_rgba(0,0,0,0.22)] backdrop-blur-[14px] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="m-0 leading-relaxed text-muted">
            Estoy abierto a oportunidades donde pueda combinar desarrollo full-stack, IoT y visualizacion de datos con una experiencia de usuario cuidada.
          </p>
          <a className="mt-3 inline-flex items-center gap-2 font-extrabold text-accent" href={`mailto:${profile.email}`}>
            <Mail size={17} /> {profile.email}
          </a>
        </div>
        <a className={btnPrimary} href={`mailto:${profile.email}`}>
          Escribime <Send size={17} />
        </a>
      </MotionFade>
    </Section>
  );
}
