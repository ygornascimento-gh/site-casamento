import { useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import { supabase } from "@/lib/supabase";
import type { Presente } from "@/types";
import { Gift, Check, Loader2, X, Copy, Heart } from "lucide-react";

const PIX_KEY = import.meta.env.VITE_PIX_KEY || "";

const GiftList = () => {
  const [gifts, setGifts] = useState<Presente[]>([]);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState<string | null>(null);
  const [reserveName, setReserveName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reserveError, setReserveError] = useState("");
  const [showPix, setShowPix] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    const { data } = await supabase
      .from("presentes")
      .select("*")
      .order("created_at", { ascending: true });
    setGifts(data ?? []);
    setLoading(false);
  };

  const handleReserve = async () => {
    if (!reserving || !reserveName.trim()) return;
    setSubmitting(true);
    setReserveError("");

    const { error } = await supabase
      .from("presentes")
      .update({ reservado_por: reserveName.trim(), reservado_em: new Date().toISOString() })
      .eq("id", reserving)
      .is("reservado_por", null);

    setSubmitting(false);

    if (error) {
      setReserveError("Ocorreu um erro ao reservar. Tente novamente.");
      return;
    }

    setGifts((prev) =>
      prev.map((g) =>
        g.id === reserving
          ? { ...g, reservado_por: reserveName.trim(), reservado_em: new Date().toISOString() }
          : g
      )
    );

    setReserving(null);
    setReserveName("");
  };

  const closeModal = () => {
    setReserving(null);
    setReserveName("");
    setReserveError("");
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return "";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  };

  return (
    <section id="presentes" className="py-20 md:py-32 bg-wedding-cream-dark/50">
      <div className="container max-w-5xl">
        <AnimatedSection>
          <h2 className="font-script text-4xl md:text-5xl text-wedding-rose text-center mb-4">
            Lista de Presentes
          </h2>
          <p className="text-center text-wedding-text-muted mb-16">
            Presentes criativos e divertidos — escolha o seu e faca a gente rir!
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-wedding-rose" />
          </div>
        ) : gifts.length === 0 ? (
          <p className="text-center text-wedding-text-muted">
            A lista de presentes será atualizada em breve!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift, i) => {
              const reserved = !!gift.reservado_por;
              return (
                <AnimatedSection key={gift.id} delay={i * 0.05}>
                  <div
                    className={`rounded-2xl border border-wedding-gold/10 bg-white/80 overflow-hidden transition-opacity ${
                      reserved ? "opacity-60" : ""
                    }`}
                  >
                    <div className="h-40 bg-wedding-cream-dark flex items-center justify-center">
                      {gift.imagem_url ? (
                        <img
                          src={gift.imagem_url}
                          alt={gift.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Gift size={40} className="text-wedding-sage" />
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-semibold text-wedding-text">
                        {gift.nome}
                      </h3>
                      {gift.descricao && (
                        <p className="text-sm text-wedding-text-muted mt-1">{gift.descricao}</p>
                      )}
                      {gift.valor && (
                        <p className="text-sm font-medium text-wedding-gold mt-2">
                          {formatCurrency(gift.valor)}
                        </p>
                      )}
                      <div className="mt-4">
                        {reserved ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-wedding-sage-dark bg-wedding-sage/10 px-3 py-1.5 rounded-full">
                            <Check size={14} />
                            Reservado
                          </span>
                        ) : (
                          <button
                            onClick={() => setReserving(gift.id)}
                            className="w-full bg-wedding-rose text-white py-2 rounded-full text-sm font-medium hover:bg-wedding-rose-dark transition-colors"
                          >
                            Quero presentear
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
            <AnimatedSection delay={gifts.length * 0.05}>
              <div className="rounded-2xl border-2 border-wedding-rose/20 bg-gradient-to-br from-wedding-rose/5 to-wedding-gold/5 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-wedding-rose/20 to-wedding-gold/20 flex items-center justify-center">
                  <Heart size={56} className="text-wedding-rose" fill="currentColor" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-serif text-lg font-semibold text-wedding-text">
                    Pix da Prosperidade
                  </h3>
                  <p className="text-sm text-wedding-text-muted mt-1">
                    Faça um Pix do seu coração para os noivos
                  </p>
                  <p className="text-sm font-medium text-wedding-gold mt-2">
                    A partir de R$ 100,00
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => setShowPix(true)}
                      className="w-full bg-wedding-rose text-white py-2 rounded-full text-sm font-medium hover:bg-wedding-rose-dark transition-colors"
                    >
                      Enviar Pix
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}
      </div>

      {showPix && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button
              onClick={() => { setShowPix(false); setPixCopied(false); }}
              className="absolute top-4 right-4 text-wedding-text-muted hover:text-wedding-text"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <Heart size={32} className="text-wedding-rose mx-auto mb-3" fill="currentColor" />
              <h3 className="font-serif text-xl font-semibold text-wedding-text mb-2">
                Pix da Prosperidade
              </h3>
              <p className="text-sm text-wedding-text-muted mb-5">
                Faça um Pix do seu coração para os noivos! Valor mínimo sugerido: R$ 100,00
              </p>
              {PIX_KEY ? (
                <>
                  <p className="text-xs text-wedding-text-muted mb-2">Chave Pix (CPF):</p>
                  <div className="flex items-center gap-2 bg-wedding-cream-dark rounded-xl px-4 py-3 mb-4">
                    <span className="flex-1 font-mono text-sm text-wedding-text select-all">{PIX_KEY}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(PIX_KEY);
                        setPixCopied(true);
                        setTimeout(() => setPixCopied(false), 2000);
                      }}
                      className="text-wedding-rose hover:text-wedding-rose-dark transition-colors"
                      aria-label="Copiar chave Pix"
                    >
                      {pixCopied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                  {pixCopied && (
                    <p className="text-sm text-wedding-sage-dark font-medium">Chave copiada!</p>
                  )}
                </>
              ) : (
                <p className="text-sm text-wedding-text-muted italic">
                  A chave Pix será disponibilizada em breve!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {reserving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-wedding-text-muted hover:text-wedding-text"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <h3 className="font-serif text-xl font-semibold text-wedding-text mb-2">
              Reservar Presente
            </h3>
            <p className="text-sm text-wedding-text-muted mb-4">
              Informe seu nome para reservar este item:
            </p>
            <input
              type="text"
              value={reserveName}
              onChange={(e) => setReserveName(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-4 py-3 rounded-xl border border-wedding-gold/20 bg-white text-wedding-text placeholder:text-wedding-text-muted/50 focus:outline-none focus:ring-2 focus:ring-wedding-rose/30 mb-4"
            />
            {reserveError && (
              <p className="text-sm text-red-500 text-center mb-4">{reserveError}</p>
            )}
            <button
              onClick={handleReserve}
              disabled={!reserveName.trim() || submitting}
              className="w-full bg-wedding-rose text-white py-3 rounded-full font-medium hover:bg-wedding-rose-dark transition-colors disabled:opacity-60"
            >
              {submitting ? "Reservando..." : "Confirmar Reserva"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GiftList;
