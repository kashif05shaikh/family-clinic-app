import { Card } from '../ui';

/**
 * Dashboard metric card with optional icon, trend, and accent color.
 */
export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = 'primary',
  className = '',
}) {
  const accentColors = {
    primary: 'bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400',
    success: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    warning: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
    error: 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400',
  };
  const valueColors = {
    primary: 'text-primary-600 dark:text-primary-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
  };

  return (
    <Card hover className={className}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
          <p className={`mt-2 font-display font-bold text-3xl tabular-nums ${valueColors[accent]}`}>
            {value}
          </p>
          {subtitle && <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>}
        </div>
        {Icon && (
          <span
            className={`flex shrink-0 w-12 h-12 items-center justify-center rounded-2xl ${accentColors[accent]} transition-transform duration-300 hover:scale-105`}
          >
            <Icon className="w-6 h-6" />
          </span>
        )}
      </div>
    </Card>
  );
}
