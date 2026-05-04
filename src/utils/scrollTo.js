/**
 * Smooth scroll to a section by its element ID.
 * Uses requestAnimationFrame with a custom ease-out curve.
 * @param {string} id - The element's id attribute (without #)
 * @param {number} [navHeight=80] - Height of the fixed navbar in px
 * @param {number} [duration=900] - Duration in milliseconds
 */
export function scrollToSection(id, navHeight = 80, duration = 900) {
  const el = id === 'top' ? null : document.getElementById(id)

  const start = window.scrollY
  const target = el
    ? el.getBoundingClientRect().top + window.scrollY - navHeight
    : 0

  const distance = target - start
  if (Math.abs(distance) < 2) return

  const startTime = performance.now()

  // Ease in-out quad — feels natural and premium
  function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = easeInOutQuart(progress)

    window.scrollTo(0, start + distance * ease)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}
