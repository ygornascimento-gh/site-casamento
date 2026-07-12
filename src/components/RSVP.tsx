import { useState, FormEvent } from "react";
import AnimatedSection from "./AnimatedSection";
import { supabase } from "@/lib/supabase";
import { Send, Check, Loader2 } from "lucide-react";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  acompanhantes: number;
  restricoes_alimentares: string;
  mensagem: string;
}

const INITIAL_FORM: FormData = {
  nome: "",
  email: "",
  telefone: "",
  acompanhantes: 0,
  restricoes_alimentares: "",
  mensagem: "",
};

const RSVP = () => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "acompanhantes" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: dbError } = await supabase.from("rsvp").insert({
      nome: form.nome,
      email: form.email || null,
      telefone: form.telefone || null,
      acompanhantes: form.acompanhantes,
      restricoes_alimentares: form.restricoes_alimentares || null,
      mensagem: form.mensagem || null,
      confirmado: true,
    });

    setLoading(false);

    if (dbError) {
      setError("Ocorreu um erro ao enviar. Tente novamente.");
      return;
    }

    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-20 md:py-32">
        <div className="container max-w-lg text-center">
          <AnimatedSection>
            <div className="w-16 h-16 mx-auto rounded-full bg-wedding-sage/20 flex items-center justify-center mb-6">
              <Check size={32} className="text-wedding-sage-dark" />
            </div>
            <h2 className="font-script text-4xl text-wedding-rose mb-4">Obrigado!</h2>
            <p className="text-wedding-text-muted">
              Sua presença foi confirmada. Mal podemos esperar para celebrar com você!
            </p>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 md:py-32">
      <div className="container max-w-lg">
        <AnimatedSection>
          <h2 className="font-script text-4xl md:text-5xl text-wedding-rose text-center mb-4">
            Confirme sua Presença
          </h2>
          <p className="text-center text-wedding-text-muted mb-12">
            Ficaremos muito felizes com a sua presença
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-wedding-text mb-1">
                Nome completo *
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                value={form.nome}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-wedding-gold/20 bg-white/80 text-wedding-text placeholder:text-wedding-text-muted/50 focus:outline-none focus:ring-2 focus:ring-wedding-rose/30"
                placeholder="Seu nome completo"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-wedding-text mb-1">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-wedding-gold/20 bg-white/80 text-wedding-text placeholder:text-wedding-text-muted/50 focus:outline-none focus:ring-2 focus:ring-wedding-rose/30"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-wedding-text mb-1">
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={form.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-wedding-gold/20 bg-white/80 text-wedding-text placeholder:text-wedding-text-muted/50 focus:outline-none focus:ring-2 focus:ring-wedding-rose/30"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="acompanhantes" className="block text-sm font-medium text-wedding-text mb-1">
                Acompanhantes
              </label>
              <select
                id="acompanhantes"
                name="acompanhantes"
                value={form.acompanhantes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-wedding-gold/20 bg-white/80 text-wedding-text focus:outline-none focus:ring-2 focus:ring-wedding-rose/30"
              >
                <option value={0}>Somente eu</option>
                <option value={1}>+1 acompanhante</option>
                <option value={2}>+2 acompanhantes</option>
                <option value={3}>+3 acompanhantes</option>
              </select>
            </div>

            <div>
              <label htmlFor="restricoes_alimentares" className="block text-sm font-medium text-wedding-text mb-1">
                Restrições alimentares
              </label>
              <input
                id="restricoes_alimentares"
                name="restricoes_alimentares"
                type="text"
                value={form.restricoes_alimentares}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-wedding-gold/20 bg-white/80 text-wedding-text placeholder:text-wedding-text-muted/50 focus:outline-none focus:ring-2 focus:ring-wedding-rose/30"
                placeholder="Vegetariano, intolerância a lactose, etc."
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-wedding-text mb-1">
                Mensagem para os noivos
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={3}
                value={form.mensagem}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-wedding-gold/20 bg-white/80 text-wedding-text placeholder:text-wedding-text-muted/50 focus:outline-none focus:ring-2 focus:ring-wedding-rose/30 resize-none"
                placeholder="Deixe uma mensagem carinhosa (opcional)"
              />
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-wedding-rose text-white px-6 py-3 rounded-full font-medium hover:bg-wedding-rose-dark transition-colors disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Confirmar Presença
                </>
              )}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default RSVP;
