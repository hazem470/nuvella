import Reveal from './Reveal.jsx'

/**
 * SectionHeading — the shared eyebrow / title / subtitle lockup.
 * Text alignment follows the writing direction automatically (`text-start`
 * rather than `text-left`), so Arabic RTL needs no special casing.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
  className = '',
  children,
}) {
  const isCenter = align === 'center'
  return (
    <Reveal className={`${isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-start'} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${isCenter ? 'justify-center' : ''} ${tone === 'dark' ? 'text-clay-300' : ''}`}>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-balance text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem] ${
          tone === 'dark' ? 'text-cream-50' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-pretty text-base leading-relaxed sm:text-[1.0625rem] ${
            tone === 'dark' ? 'text-cream-200/80' : 'text-ink-500'
          } ${isCenter ? 'mx-auto max-w-2xl' : ''}`}
        >
          {subtitle}
        </p>
      )}
      {children}
    </Reveal>
  )
}
