import React from 'react';
import { motion } from 'framer-motion';
import { scrollToSection } from '../utils/scrollTo';

const navLinks = [
  { name: 'About',    id: 'about'    },
  { name: 'Services', id: 'services' },
  { name: 'Process',  id: 'process'  },
  { name: 'Work',     id: 'work'     },
  { name: 'Contact',  id: 'contact'  },
];

const Footer = () => {
  return (
    <footer className="relative bg-bg py-12 px-6 md:px-16 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-px bg-border"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="flex flex-col gap-3 items-center md:items-start">
          <button
            onClick={() => scrollToSection('top')}
            className="font-display text-3xl text-heading cursor-pointer border-none bg-transparent p-0"
          >
            Vicianum<span className="text-accent">DS</span>
          </button>
          <p className="text-muted text-xs uppercase tracking-[0.2em] font-medium">
            Precision Dental Solutions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-muted text-sm uppercase tracking-widest hover:text-accent transition-colors duration-300 py-3 px-2 cursor-pointer border-none bg-transparent"
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="text-center md:text-right">
          <p className="text-muted text-xs uppercase tracking-widest opacity-60">
            © 2025 Vicianum DS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
