/**
 * Reusable card with optional padding, hover shadow, and dark mode support.
 */
export default function Card({
  children,
  className = '',
  padding = true,
  hover = false,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={[
        'rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 shadow-sm transition-all duration-300',
        padding && 'p-6 sm:p-8',
        hover && 'hover:-translate-y-1 hover:shadow-xl hover:border-primary-500/30 dark:hover:border-primary-500/40 cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Component>
  );
}
