import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  src: string;
  alt: string;
}

const photos: Photo[] = [
  { src: "/photos/261caf42-9b6b-4186-8fa7-b4a72f9c2775.JPG", alt: "Passeio romantico a noite" },
  { src: "/photos/494c38ba-bf30-4884-bd7e-5749ee9360db.JPG", alt: "Dia de praia juntos" },
  { src: "/photos/21028ae6-43ef-42c1-9f7e-00f264de6318.JPG", alt: "Paraiso tropical" },
  { src: "/photos/1b478f5d-579d-45ab-8744-c8e8f9b15eee.JPG", alt: "Las Lenas, Argentina" },
  { src: "/photos/0eba191d-2e64-462d-b859-bd60c8112ee0.JPG", alt: "Aventura no esqui" },
  { src: "/photos/49405bdd-a2c1-45b7-acdf-1acc9fd43ca0.JPG", alt: "Montanhas da Argentina" },
  { src: "/photos/bb8cdccf-adaa-4354-b438-f7a1ea4e659c.JPG", alt: "Mendoza, Argentina" },
  { src: "/photos/5db6e010-5098-4781-aef0-92aafe308659.JPG", alt: "Fonte em Buenos Aires" },
  { src: "/photos/ec4fcbad-0fc8-43a0-9473-8bd13ce76b4c.JPG", alt: "Estrada nevada" },
  { src: "/photos/a6d07b5e-d953-4997-8900-e2836dcc3cda.JPG", alt: "Las Lenas, na neve" },
  { src: "/photos/71be7a69-8920-401e-a46d-429668147171.JPG", alt: "Costao rochoso" },
  { src: "/photos/6c54391c-d829-4ef3-b632-1795d07a6017.JPG", alt: "Rua dos guarda-chuvas" },
  { src: "/photos/96a5394f-8cc2-4d70-85ab-ad89c8cefc42.JPG", alt: "Noite em Monte Verde" },
  { src: "/photos/725bc4e5-8b11-45eb-94e0-59ec38992868.JPG", alt: "Vale do Bom Jardim" },
  { src: "/photos/adb11bd4-54dd-43a4-a41b-972d3471fe92.JPG", alt: "Icebar Monte Verde" },
  { src: "/photos/b052f838-dce6-4664-861b-c7816caa31c2.JPG", alt: "Urso gigante de pelucia" },
  { src: "/photos/c2bea460-0bdc-447f-a3e6-11f98a329613.JPG", alt: "Pousada do Aviao" },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

const PhotoCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const index = ((page % photos.length) + photos.length) % photos.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => [prev + newDirection, newDirection]);
    },
    [],
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-wedding-cream-dark/30 border border-wedding-gold/10 shadow-lg">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={page}
            src={photos[index].src}
            alt={photos[index].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) paginate(1);
              else if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
            className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
          />
        </AnimatePresence>

        <button
          onClick={() => paginate(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-wedding-text hover:bg-white/90 transition-colors shadow-md"
          aria-label="Foto anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-wedding-text hover:bg-white/90 transition-colors shadow-md"
          aria-label="Proxima foto"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > index ? 1 : -1])}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-wedding-rose w-6"
                : "bg-wedding-gold/30 hover:bg-wedding-gold/50"
            }`}
            aria-label={`Ir para foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
