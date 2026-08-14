import React from 'react';
import { motion } from 'framer-motion';
import { scrollToSection } from '../utils/scrollTo';
import { NAV_LINKS } from '../content';

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
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('top') }}
            className="font-display text-3xl text-heading cursor-pointer border-none bg-transparent p-0"
          >
            Vicianum<span className="text-accent">DS</span>
          </a>
          <p className="text-muted text-xs uppercase tracking-[0.2em] font-medium">
            Precision Dental Solutions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id) }}
              className="text-muted text-sm uppercase tracking-widest hover:text-accent transition-colors duration-300 py-3 px-2 cursor-pointer border-none bg-transparent"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="text-center md:text-right">
          <p className="text-muted text-xs uppercase tracking-widest opacity-60">
            © {new Date().getFullYear()} Vicianum DS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
