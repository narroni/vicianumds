import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  { title: 'Send Your Case',  description: 'Ship physical impressions or upload digital scans' },
  { title: 'We Fabricate',   description: 'Our lab crafts your restoration with clinical precision' },
  { title: 'Quality Check',  description: 'Every piece passes a strict QC protocol before leaving' },
  { title: 'Fast Delivery',  description: 'Shipped directly to your clinic in 5–7 business days' },
]

const Process = () => {
  return (
    <section id="process" className="bg-bg py-24 md:py-32 px-5 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-heading"
          >
            From Impression to Delivery
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px bg-accent mx-auto mt-6 md:mt-8"
          />
        </div>

        {/* Steps — mobile: vertical list, desktop: horizontal row */}
        <div className="relative">
          {/* Vertical dashed line for mobile — runs behind all steps */}
          <div
            className="md:hidden absolute left-6 top-6 bottom-0 pointer-events-none"
            style={{ width: '1px', borderLeft: '1px dashed #2E3F34' }}
          />

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-0 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 relative group">
                {/* Desktop horizontal connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px pointer-events-none">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.4, duration: 0.8 }}
                      style={{ originX: 0 }}
                      className="w-full h-px border-t border-dashed border-border"
                    />
                  </div>
                )}

                {/* Mobile: flex-row (circle left, text right) | Desktop: flex-col centered */}
                <div className={`flex flex-row md:flex-col md:items-center md:text-center items-start gap-4 md:gap-0 ${
                  index < steps.length - 1 ? 'pb-14' : 'pb-0'
                } md:pb-0`}>
                  {/* Number circle */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
                    className="w-12 h-12 flex-shrink-0 rounded-full border border-accent flex items-center justify-center text-accent font-display text-xl bg-bg group-hover:bg-accent group-hover:text-bg transition-colors duration-500 relative z-10"
                  >
                    {index + 1}
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.1, duration: 0.6 }}
                    className="pt-1 md:pt-0 md:mt-6"
                  >
                    <h3 className="font-sans font-medium text-heading mb-2 uppercase tracking-widest text-[10px]">
                      Step 0{index + 1} — {step.title}
                    </h3>
                    <p className="font-sans text-muted text-sm leading-relaxed md:max-w-[220px]">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
