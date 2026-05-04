import React from 'react';
import { motion } from 'framer-motion';

const navLinks = ['Services', 'Process', 'Work', 'About', 'Contact'];

const Footer = () => {
  return (
    <footer className="relative bg-bg py-12 px-6 md:px-16 overflow-hidden">
      {/* Animated Top Border */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-px bg-border"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        {/* Left: Logo & Tagline */}
        <div className="flex flex-col gap-3 items-center md:items-start">
          <a href="#" className="font-display text-3xl text-heading">
            Vicianum<span className="text-accent">DS</span>
          </a>
          <p className="text-muted text-xs uppercase tracking-[0.2em] font-medium">
            Precision Dental Solutions
          </p>
        </div>

        {/* Center: Nav Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-muted text-sm uppercase tracking-widest hover:text-accent transition-colors duration-300 py-3 px-2"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Copyright */}
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
