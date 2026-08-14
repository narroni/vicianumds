import { motion } from 'framer-motion';
import { scrollToSection } from '../utils/scrollTo';
import { NAV_LINKS } from '../content';

// lucide-react has no brand/logo icons (Instagram, Twitter, etc. are
// intentionally out of scope for that library) — inlined here matching
// lucide's own stroke conventions (24x24 viewBox, stroke-width 2, round
// caps/joins, no fill) so it reads as part of the same icon set.
function InstagramIcon({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

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

        <div className="flex flex-col items-center md:items-end gap-3">
          <a
            href="https://www.instagram.com/vicianumds/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vicianum Dental Studio on Instagram"
            className="text-muted hover:text-accent transition-colors duration-300"
          >
            <InstagramIcon size={18} />
          </a>
          <p className="text-muted text-xs uppercase tracking-widest opacity-60 text-center md:text-right">
            © {new Date().getFullYear()} Vicianum DS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
