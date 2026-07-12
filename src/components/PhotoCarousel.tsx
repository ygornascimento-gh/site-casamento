import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  src: string;
  alt: string;
}

const photos: Photo[] = [
  { src: "/photos/d52d772e-b63f-4562-bc09-5a684030720d.jpg", alt: "Poliete & Ygor juntos" },
  { src: "/photos/IMG_3300.jpg", alt: "Jantar romantico" },
  { src: "/photos/IMG_0373.jpg", alt: "Viagem a Guaruja" },
  { src: "/photos/IMG_3018.jpg", alt: "Dia de sol no pier" },
  { src: "/photos/IMG_3919.jpg", alt: "Noite com vista da cidade" },
  { src: "/photos/IMG_3792.jpg", alt: "Diversao em Monte Verde" },
  { src: "/photos/IMG_1131.jpg", alt: "Aventura na neve" },
  { src: "/photos/4775766C-BD20-4219-9ACA-A2126638A755.jpg", alt: "Las Lenas, Argentina" },
  { src: "/photos/IMG_3837.jpg", alt: "Icebar" },
  { src: "/photos/IMG_4682.jpg", alt: "Familia reunida" },
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
