import { Mail } from "lucide-react";
import MotionFade from "@/components/motion/MotionFade";
import ContactForm from "@/components/sections/ContactForm";
import Section from "@/components/ui/Section";
import { profile } from "@/data/portfolio";

const panel =
  "rounded-3xl border border-line bg-panel p-6 shadow-[0_20px_56px_rgba(0,0,0,0.22)] backdrop-blur-[14px] md:p-8";

export default function ContactSection() {
  return (
    <Section
      id="contact"
      className="scroll-mt-24"
      eyebrow="../Contacto"
      title="Hablemos de tu proximo producto, dashboard o integracion."
    >
      <div className={`${panel} grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10`}>
        <MotionFade className="flex flex-col justify-center gap-4">
          <p className="m-0 leading-relaxed text-muted lg:text-[1.02rem]">
            Estoy abierto a oportunidades donde pueda combinar desarrollo full-stack, IoT y visualizacion de datos con una experiencia de usuario cuidada.
          </p>
          <a
            className="inline-flex w-fit items-center gap-2 font-mono text-sm font-bold text-accent transition-colors hover:text-accent-2"
            href={`mailto:${profile.email}`}
          >
            <Mail size={17} /> {profile.email}
          </a>
        </MotionFade>
        <MotionFade delay={0.06}>
          <ContactForm />
        </MotionFade>
      </div>
    </Section>
  );
}
