// Literal color values for use in JS (framer-motion animate/variants
// props, which need parseable colors to interpolate — CSS custom
// properties like var(--color-accent) aren't reliably animatable
// there). Keep these in sync with the @theme tokens in src/index.css.
export const COLOR_BG = '#0F1712'
export const COLOR_SURFACE = '#1C2B22'
export const COLOR_BORDER = '#2E3F34'
export const COLOR_ACCENT = '#8FC49F'
export const COLOR_HEADING = '#EDE9E2'
export const COLOR_MUTED = '#A8B5A0'

// Darkened accent used for button hover states — not in the token
// palette (only one shade of accent is defined there).
export const COLOR_ACCENT_HOVER = '#7ab58e'
