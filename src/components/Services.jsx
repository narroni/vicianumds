import { motion } from 'framer-motion';
import { SERVICES } from '../content';
import ResponsiveImage from './ResponsiveImage';

export default function Services() {
  return (
    <section id="services" className="bg-surface py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-6xl text-heading mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-accent text-sm uppercase tracking-[0.3em] font-medium"
          >
            Precision. Aesthetics. Durability.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(143, 196, 159, 0.15)"
              }}
              className="bg-surface-2 border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center group transition-all duration-300"
            >
              {/* Icon Container - Maximized for premium impact */}
              <div className="w-full h-64 mb-6 flex items-center justify-center relative overflow-hidden rounded-xl">
                <ResponsiveImage
                  name={service.icon}
                  alt={service.title}
                  loading="lazy"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text */}
              <h3 className="font-display text-2xl text-white mb-3">
                {service.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
