import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const images = [
  {
    src: "/images/work.jpg",
    label: "Masterful Craftsmanship",
    className: "md:row-span-2 md:col-span-1"
  },
  {
    src: "/images/portrait.jpg",
    label: "Aesthetic Perfection",
    className: "md:row-span-1 md:col-span-1"
  },
  {
    src: "/images/lab.jpg",
    label: "Technological Precision",
    className: "md:row-span-1 md:col-span-1"
  }
];

const GalleryItem = ({ image, index, isMobile }) => {
  return (
    <div className={`group relative overflow-hidden rounded-xl bg-surface ${image.className} ${isMobile ? 'min-w-full snap-start h-[500px]' : ''}`}>
      {/* Curtain Reveal */}
      <motion.div
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.2, ease: [0.77, 0, 0.175, 1] }}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-accent z-20 pointer-events-none"
      />

      {/* Image Container */}
      <div className="w-full h-full relative overflow-hidden">
        <img
          src={image.src}
          alt={image.label}
          className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-[1.06]"
        />

        {/* Hover Overlay - Only on desktop or always visible label on mobile? 
            User said dark overlay fades in showing label. I'll make it visible on mobile tap or hover. */}
        <div className="absolute inset-0 bg-bg/50 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10 p-6">
          <p className="font-display italic text-white text-2xl md:text-3xl text-center transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
            {image.label}
          </p>
        </div>
        
        {/* Mobile Always-on Label if desired, but I'll stick to the overlay for consistency */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg/80 to-transparent z-10">
           <p className="font-display italic text-white text-xl">{image.label}</p>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = (e) => {
    if (!isMobile) return;
    const scrollPosition = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <section id="work" className="bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display italic text-heading leading-tight"
          >
            The Work
          </motion.h2>
        </div>

        {/* Grid / Mobile Slider */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className={`
            ${isMobile 
              ? 'flex overflow-x-auto snap-x-mandatory hide-scrollbar gap-0' 
              : 'grid grid-cols-1 md:grid-cols-[1.2fr_1fr] grid-rows-[repeat(2,minmax(300px,1fr))] gap-6 md:h-[800px]'
            }
          `}
        >
          {images.map((image, index) => (
            <GalleryItem key={index} image={image} index={index} isMobile={isMobile} />
          ))}
        </div>

        {/* Dot Indicators for Mobile */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-8">
            {images.map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-accent w-6' : 'bg-border'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
