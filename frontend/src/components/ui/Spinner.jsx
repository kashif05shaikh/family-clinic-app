/**
 * Centered or inline spinner.
 */
export default function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'h-5 w-5 border-2', md: 'h-10 w-10 border-2', lg: 'h-12 w-12 border-4' };
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`animate-spin rounded-full border-primary-200 border-t-primary-600 ${sizes[size]} ${className}`}
    />
  );
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <Spinner size="lg" />
    </div>
  );
}
