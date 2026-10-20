/**
 * Reusable button with variants: primary, secondary, ghost, danger.
 * Supports smooth transitions, loading spinner, and dark mode.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  as: Component = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98] select-none';
  const variants = {
    primary:
      'bg-primary-600 hover:bg-primary-500 text-white shadow-md shadow-primary-600/20 hover:shadow-lg hover:shadow-primary-600/30 focus:ring-primary-500 border border-transparent',
    secondary:
      'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:ring-slate-400',
    ghost:
      'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-400',
    danger:
      'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 focus:ring-red-500 border border-transparent',
  };
  const sizes = {
    sm: 'px-3.5 py-1.5 text-sm gap-1.5',
    md: 'px-4.5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold',
  };

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      disabled={disabled || loading}
      className={[base, variants[variant], sizes[size], className].join(' ')}
      {...props}
    >
      {loading ? (
        <>
          <span className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </Component>
  );
}
