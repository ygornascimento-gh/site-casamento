import { useState, useEffect, FormEvent } from "react";
import AnimatedSection from "./AnimatedSection";
import { supabase } from "@/lib/supabase";
import type { MuralMessage } from "@/types";
import { MessageCircle, Send, Loader2 } from "lucide-react";

const MessageWall = () => {
  const [messages, setMessages] = useState<MuralMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [autor, setAutor] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("mural")
      .select("*")
      .eq("aprovado", true)
      .order("created_at", { ascending: false });
    setMessages(data ?? []);
    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!autor.trim() || !mensagem.trim()) return;
    setSubmitting(true);
    setError("");

    const { error: dbError } = await supabase.from("mural").insert({
      autor: autor.trim(),
      mensagem: mensagem.trim(),
    });

    setSubmitting(false);

    if (dbError) {
      setError("Ocorreu um erro ao enviar. Tente novamente.");
      return;
    }

    setSubmitted(true);
    setAutor("");
    setMensagem("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="mural" className="py-20 md:py-32">
      <div className="container max-w-4xl">
        <AnimatedSection>
          <h2 className="font-script text-4xl md:text-5xl text-wedding-rose text-center mb-4">
            Mural de Recados
          </h2>
          <p className="text-center text-wedding-text-muted mb-12">
            Deixe uma mensagem carinhosa para os noivos
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16 space-y-4">
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              placeholder="Seu nome"
              required
              className="w-full px-4 py-3 rounded-xl border border-wedding-gold/20 bg-white/80 text-wedding-text placeholder:text-wedding-text-muted/50 focus:outline-none focus:ring-2 focus:ring-wedding-rose/30"
            />
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Sua mensagem para os noivos..."
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-wedding-gold/20 bg-white/80 text-wedding-text placeholder:text-wedding-text-muted/50 focus:outline-none focus:ring-2 focus:ring-wedding-rose/30 resize-none"
            />
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-wedding-rose text-white py-3 rounded-full font-medium hover:bg-wedding-rose-dark transition-colors disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {submitting ? "Enviando..." : "Enviar Mensagem"}
            </button>
            {submitted && (
              <p className="text-sm text-center text-wedding-sage-dark">
                Mensagem enviada! Ela aparecerá após aprovação dos noivos.
              </p>
            )}
          </form>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 size={24} className="animate-spin text-wedding-rose" />
          </div>
        ) : messages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {messages.map((msg, i) => (
              <AnimatedSection key={msg.id} delay={i * 0.05}>
                <div className="bg-white/80 border border-wedding-gold/10 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-wedding-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageCircle size={14} className="text-wedding-rose" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-wedding-text">{msg.autor}</p>
                      <p className="text-sm text-wedding-text-muted mt-1 leading-relaxed">
                        {msg.mensagem}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <p className="text-center text-wedding-text-muted text-sm">
            Seja o primeiro a deixar uma mensagem!
          </p>
        )}
      </div>
    </section>
  );
};

export default MessageWall;
