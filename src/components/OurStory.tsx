import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";
import { Heart } from "lucide-react";

interface Milestone {
  date: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    date: "2020",
    title: "Nos Conhecemos",
    description: "O destino nos colocou no mesmo caminho e desde entao nao nos separamos mais.",
  },
  {
    date: "2021",
    title: "Primeiro Namoro",
    description: "Decidimos oficializar o que ja era obvio para todos ao nosso redor.",
  },
  {
    date: "2025",
    title: "O Pedido",
    description: "Com o coracao acelerado, a pergunta mais importante foi feita — e a resposta foi sim!",
  },
  {
    date: "2026",
    title: "O Grande Dia",
    description: "18 de Setembro — o dia em que nos tornamos um so.",
  },
];

const OurStory = () => (
  <section id="historia" className="py-20 md:py-32">
    <div className="container max-w-3xl">
      <AnimatedSection>
        <h2 className="font-script text-4xl md:text-5xl text-wedding-rose text-center mb-4">
          Nossa Historia
        </h2>
        <p className="text-center text-wedding-text-muted mb-4">
          Os momentos que nos trouxeram ate aqui
        </p>
        <FloralDivider className="mb-8" />
      </AnimatedSection>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-wedding-gold/30 -translate-x-1/2" />

        {milestones.map((m, i) => (
          <AnimatedSection key={m.date} delay={i * 0.15}>
            <div className={`relative flex items-center mb-12 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
              <div className={`w-5/12 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                <span className="text-sm font-medium text-wedding-gold uppercase tracking-wider">
                  {m.date}
                </span>
                <h3 className="font-serif text-xl font-semibold text-wedding-text mt-1">
                  {m.title}
                </h3>
                <p className="text-sm text-wedding-text-muted mt-2 leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-wedding-cream border-2 border-wedding-rose flex items-center justify-center">
                <Heart size={14} className="text-wedding-rose fill-wedding-rose" />
              </div>

              <div className="w-5/12" />
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default OurStory;
