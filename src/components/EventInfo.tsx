import AnimatedSection from "./AnimatedSection";
import { MapPin, Clock, Shirt, PartyPopper, Navigation } from "lucide-react";

interface InfoCard {
  icon: typeof MapPin;
  title: string;
  lines: string[];
}

const cards: InfoCard[] = [
  {
    icon: Clock,
    title: "Cerimônia",
    lines: ["16:00", "18 de Setembro de 2026"],
  },
  {
    icon: PartyPopper,
    title: "Recepção",
    lines: ["18:00", "No mesmo local"],
  },
  {
    icon: MapPin,
    title: "Local",
    lines: ["Espaço Alpes Serrano", "Av. Parque Petrópolis, 387", "Serra da Cantareira, Mairiporã – SP"],
  },
  {
    icon: Shirt,
    title: "Dress Code",
    lines: ["Traje Social", "Cores claras"],
  },
];

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658!2d-46.6130611!3d-23.3780991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef5c2a76f3b8d%3A0x0!2sEspa%C3%A7o+Alpes+Serrano!5e0!3m2!1spt-BR!2sbr";

const MAPS_LINK =
  "https://www.google.com/maps/dir/?api=1&destination=Espa%C3%A7o+Alpes+Serrano+Av+Parque+Petropolis+387+Mairipora+SP";

const EventInfo = () => (
  <section id="evento" className="py-20 md:py-32 bg-wedding-cream-dark/50">
    <div className="container max-w-4xl">
      <AnimatedSection>
        <h2 className="font-script text-4xl md:text-5xl text-wedding-rose text-center mb-4">
          Informações
        </h2>
        <p className="text-center text-wedding-text-muted mb-16">
          Tudo que você precisa saber sobre o grande dia
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

      <AnimatedSection delay={0.5}>
        <div className="mt-12 rounded-2xl overflow-hidden border border-wedding-gold/10 shadow-sm">
          <div className="bg-white/80 backdrop-blur-sm p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-wedding-rose/10 flex items-center justify-center">
                <MapPin size={18} className="text-wedding-rose" />
              </div>
              <div>
                <p className="font-serif font-semibold text-wedding-text">
                  Espaço Alpes Serrano
                </p>
                <p className="text-sm text-wedding-text-muted">
                  Av. Parque Petrópolis, 387 – Serra da Cantareira, Mairiporã – SP
                </p>
              </div>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-wedding-rose text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-wedding-rose-dark transition-colors"
            >
              <Navigation size={14} />
              Como chegar
            </a>
          </div>

          <iframe
            src={MAPS_EMBED_URL}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do evento"
            className="w-full"
          />

          <div className="sm:hidden bg-white/80 p-4">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-wedding-rose text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-wedding-rose-dark transition-colors w-full"
            >
              <Navigation size={14} />
              Como chegar
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default EventInfo;
