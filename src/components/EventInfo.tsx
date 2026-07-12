import AnimatedSection from "./AnimatedSection";
import { MapPin, Clock, Shirt, PartyPopper } from "lucide-react";

interface InfoCard {
  icon: typeof MapPin;
  title: string;
  lines: string[];
}

const cards: InfoCard[] = [
  {
    icon: Clock,
    title: "Cerimonia",
    lines: ["16:00", "18 de Setembro de 2026"],
  },
  {
    icon: PartyPopper,
    title: "Recepcao",
    lines: ["18:00", "No mesmo local"],
  },
  {
    icon: MapPin,
    title: "Local",
    lines: ["A definir", "Cidade - Estado"],
  },
  {
    icon: Shirt,
    title: "Dress Code",
    lines: ["Traje Social", "Cores claras"],
  },
];

const EventInfo = () => (
  <section id="evento" className="py-20 md:py-32 bg-wedding-cream-dark/50">
    <div className="container max-w-4xl">
      <AnimatedSection>
        <h2 className="font-script text-4xl md:text-5xl text-wedding-rose text-center mb-4">
          Informacoes
        </h2>
        <p className="text-center text-wedding-text-muted mb-16">
          Tudo que voce precisa saber sobre o grande dia
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <AnimatedSection key={card.title} delay={i * 0.1}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-wedding-gold/10 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-wedding-rose/10 flex items-center justify-center mb-4">
                <card.icon size={22} className="text-wedding-rose" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-wedding-text mb-2">
                {card.title}
              </h3>
              {card.lines.map((line) => (
                <p key={line} className="text-sm text-wedding-text-muted">
                  {line}
                </p>
              ))}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default EventInfo;
