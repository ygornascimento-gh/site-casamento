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
    date: "Setembro 2022",
    title: "Um Restaurante na Vila Madalena",
    description:
      "Nos conhecemos no Pasquim, na Vila Madalena. A calma dela, a voz doce, o olhar carinhoso — e muitas risadas sobre historias da vida. Daquelas noites que a gente sente que nao quer que acabe.",
  },
  {
    date: "2022",
    title: "O Namoro Mais Espontaneo do Mundo",
    description:
      "Fomos jantar em um japones. No fim da noite, a mae dele ligou e ele soltou: \"to aqui com a minha namorada.\" Ela cerrou a sobrancelha: \"estamos namorando?\" E ele: \"ue, precisa perguntar? Voce quer namorar comigo?\" Ela disse sim — e nao paramos de rir.",
  },
  {
    date: "2022 — 2023",
    title: "A Nossa Cara",
    description:
      "Sempre fomos caseiros. Nosso programa favorito? Filme, ficar juntos curtindo a so — e de repente uma mala pronta pra Paraty, Monte Verde ou o litoral de SP. A gente ri demais, brinca demais. Calma, paciencia, leveza e muita parceria.",
  },
  {
    date: "Janeiro 2024",
    title: "Morar Juntos",
    description:
      "Depois de muito pastel na feira aos sabados e domingos grudados, decidimos que nao fazia mais sentido voltar cada um pra sua casa. Passamos a dividir o dia a dia — e descobrimos que juntos e ainda melhor.",
  },
  {
    date: "2024",
    title: "O Pedido (No Japones, Claro)",
    description:
      "Ele a convidou pra um japones — porque grandes momentos merecem o lugar certo. No fim do jantar, pediu ela em casamento. A resposta? \"Pensei que nao ia pedir... que demora!\" Riram muito. Do jeito deles. Perfeito.",
  },
  {
    date: "18 de Setembro 2026",
    title: "O Grande Dia",
    description:
      "Depois de muitas risadas, viagens, feiras de sabado e domingos no sofa — chega o dia de celebrar tudo isso com quem a gente ama. Vem ser feliz com a gente!",
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
          Do Pasquim ao altar — do nosso jeito
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
