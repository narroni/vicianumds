// ────────────────────────────────────────────────────────────────
// content.js
//
// Single source of truth for the site's copy and structured content
// (nav links, headings, stats, service/gallery/process listings,
// contact info and form fields). Edit the values below to change
// what visitors see — no need to touch component files.
// ────────────────────────────────────────────────────────────────

import { Mail, Phone, MapPin } from 'lucide-react'

// Navbar + Footer — section links. `name` is the visible label,
// `id` must match the target section's id attribute.
export const NAV_LINKS = [
  { name: 'About',    id: 'about'    },
  { name: 'Services', id: 'services' },
  { name: 'Process',  id: 'process'  },
  { name: 'Work',     id: 'work'     },
  { name: 'Contact',  id: 'contact'  },
]

// Hero — animated headline, one entry per word.
// `em: true` renders the word italic/accent-colored.
export const HEADING_WORDS = [
  { text: 'Crafted', em: false },
  { text: 'for', em: false },
  { text: 'Dentists.', em: true },
  { text: 'Built', em: false },
  { text: 'for', em: false },
  { text: 'Perfection.', em: true },
]

// About — the count-up stats row (500+, 10+, 99%)
export const STATS = [
  { value: 500, suffix: '+', label: 'Cases' },
  { value: 10,  suffix: '+', label: 'Years' },
  { value: 99,  suffix: '%', label: 'Satisfaction' },
]

// About — checklist under the stats row
export const BULLETS = [
  'Digital & analog workflow',
  '5–7 day turnaround',
  'Direct technician contact',
]

// Services — one card per service. `icon` is the image path shown in the card.
export const SERVICES = [
  {
    title: "Molar Crowns",
    description: "High-quality, durable protection for weakened teeth.",
    icon: "/images/crown.png",
  },
  {
    title: "Dental Veneers",
    description: "Custom-made shells for a flawless, natural-looking smile.",
    icon: "/images/veneer.png",
  },
  {
    title: "Dental Bridges",
    description: "Seamlessly fill gaps and restore your bite's functionality.",
    icon: "/images/bridge.png",
  },
  {
    title: "Dental Implants",
    description: "Permanent, gold-standard solutions for missing teeth.",
    icon: "/images/implant.png",
  }
]

// Gallery ("The Work") — showcase images with captions.
// `className` controls the tile's placement/size in the desktop grid.
export const GALLERY_IMAGES = [
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
]

// Process — "From Impression to Delivery" steps, in order
export const PROCESS_STEPS = [
  { title: 'Send Your Case', description: 'Ship physical impressions or upload digital scans' },
  { title: 'We Fabricate',   description: 'Our lab crafts your restoration with clinical precision' },
  { title: 'Quality Check',  description: 'Every piece passes a strict QC protocol before leaving' },
  { title: 'Fast Delivery',  description: 'Shipped directly to your clinic in 5–7 business days' },
]

// Contact — info row shown under the form (icon, label)
export const CONTACT_INFO = [
  { Icon: Mail,   label: 'info@vicianumds.com' },
  { Icon: Phone,  label: '+383 44 123 456' },
  { Icon: MapPin, label: 'Prishtina, Kosovo' },
]

// Contact — form field definitions (name must match the state key in Contact.jsx)
export const CONTACT_FIELDS = [
  { name: 'name',   label: 'Full Name',              type: 'text',  required: true },
  { name: 'clinic', label: 'Clinic / Practice Name', type: 'text',  required: true },
  { name: 'email',  label: 'Email',                  type: 'email', required: true },
  { name: 'phone',  label: 'Phone (optional)',       type: 'tel',   required: false },
]
