/**
 * Reusable card with optional padding, hover shadow, and border.
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
        'rounded-xl border border-slate-200/80 bg-white shadow-sm',
        padding && 'p-6',
        hover && 'transition-all duration-200 hover:shadow-md hover:border-slate-300/80',
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
