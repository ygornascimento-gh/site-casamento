import { useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import { supabase } from "@/lib/supabase";
import type { Presente } from "@/types";
import { Gift, Check, Loader2, X } from "lucide-react";

const GiftList = () => {
  const [gifts, setGifts] = useState<Presente[]>([]);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState<string | null>(null);
  const [reserveName, setReserveName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reserveError, setReserveError] = useState("");

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
            Escolha um presente especial para nós
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
          </div>
        )}
      </div>

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
