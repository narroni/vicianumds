import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Porcelain Crowns",
    description: "Natural-looking full coverage restorations"
  },
  {
    title: "Dental Bridges",
    description: "Fixed multi-unit restorations with precision fit"
  },
  {
    title: "Veneers",
    description: "Ultra-thin ceramic shells for aesthetic cases"
  },
  {
    title: "Implant Crowns",
    description: "Screw-retained and cement-retained options"
  },
  {
    title: "Full Dentures",
    description: "Complete removable prosthetics, full arch"
  },
  {
    title: "Inlays & Onlays",
    description: "Conservative indirect ceramic restorations"
  }
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return; // Disable tilt on mobile
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rY = (mouseX / (rect.width / 2)) * 10;
    const rX = -(mouseY / (rect.height / 2)) * 10;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: '800px' }}
      className="group snap-start min-w-[280px] md:min-w-0"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: rotateX === 0 && rotateY === 0 ? 'transform 0.5s ease' : 'none'
        }}
        className="relative bg-bg border border-border p-7 rounded-lg h-full overflow-hidden flex flex-col gap-4 transform-gpu"
      >
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          className="absolute top-0 left-0 h-[2px] bg-accent"
        />

        <div className="flex flex-col gap-2 relative z-10">
          <h3 className="font-display text-heading leading-tight">
            {service.title}
          </h3>
          <p className="font-sans text-sm text-muted leading-relaxed">
            {service.description}
          </p>
        </div>
        
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="block text-accent font-sans text-xs uppercase tracking-[0.2em] mb-4"
          >
            What We Craft
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-heading max-w-2xl"
          >
            Every Restoration, Perfected.
          </motion.h2>
        </div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-8 snap-x-mandatory scroll-hint-animation">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
        
        {/* Mobile Scroll Hint Label */}
        <div className="md:hidden text-center mt-4 opacity-50">
          <span className="text-[10px] uppercase tracking-widest text-muted">Scroll to explore services</span>
        </div>
      </div>
    </section>
  );
};

export default Services;
