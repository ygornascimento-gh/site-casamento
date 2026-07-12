import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-wedding-gold/10">
    <div className="container text-center">
      <p className="font-script text-3xl text-wedding-rose mb-3">
        Poliete & Ygor
      </p>
      <p className="text-sm text-wedding-text-muted mb-4">
        18 de Setembro de 2026
      </p>
      <p className="text-xs text-wedding-text-muted/60 flex items-center justify-center gap-1">
        Feito com <Heart size={12} className="text-wedding-rose fill-wedding-rose" /> para o nosso grande dia
      </p>
      <p className="mt-4 text-sm font-medium text-wedding-gold">
        #PolieteeYgor
      </p>
    </div>
  </footer>
);

export default Footer;
