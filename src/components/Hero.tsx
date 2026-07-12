import AnimatedSection from "./AnimatedSection";
import BranchLeft from "@/assets/florals/branch-left";
import BranchRight from "@/assets/florals/branch-right";
import { useCountdown } from "@/hooks/useCountdown";

const WEDDING_DATE = new Date("2026-09-18T16:00:00");

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl md:text-5xl font-serif font-semibold text-wedding-text">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs uppercase tracking-widest text-wedding-text-muted mt-1">
      {label}
    </span>
  </div>
);

const Hero = () => {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <BranchLeft className="absolute top-10 left-0 w-32 md:w-48 opacity-40 pointer-events-none" />
      <BranchRight className="absolute bottom-10 right-0 w-32 md:w-48 opacity-40 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b from-wedding-cream via-transparent to-wedding-cream/50 pointer-events-none" />

      <div className="relative z-10 text-center px-6 py-20">
        <AnimatedSection>
          <p className="text-sm uppercase tracking-[0.3em] text-wedding-text-muted mb-4">
            Nosso casamento
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h1 className="font-script text-6xl md:text-8xl text-wedding-rose leading-tight">
            Poliete & Ygor
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="font-serif text-xl md:text-2xl text-wedding-text-muted mt-6">
            18 de Setembro de 2026
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.45}>
          <div className="mt-12 flex items-center justify-center gap-6 md:gap-10">
            <CountdownUnit value={days} label="Dias" />
            <span className="text-2xl text-wedding-gold font-serif">:</span>
            <CountdownUnit value={hours} label="Horas" />
            <span className="text-2xl text-wedding-gold font-serif">:</span>
            <CountdownUnit value={minutes} label="Min" />
            <span className="text-2xl text-wedding-gold font-serif">:</span>
            <CountdownUnit value={seconds} label="Seg" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <button
            onClick={() => document.querySelector("#rsvp")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-12 inline-block bg-wedding-rose text-white px-8 py-3 rounded-full font-medium hover:bg-wedding-rose-dark transition-colors"
          >
            Confirmar Presença
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
