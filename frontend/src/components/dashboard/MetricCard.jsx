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
    primary: 'bg-primary-500/10 text-primary-600',
    success: 'bg-emerald-500/10 text-emerald-600',
    warning: 'bg-amber-500/10 text-amber-600',
    error: 'bg-red-500/10 text-red-600',
  };
  const valueColors = {
    primary: 'text-primary-600',
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    error: 'text-red-600',
  };

  return (
    <Card hover className={className}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className={`mt-2 font-display font-bold text-3xl tabular-nums ${valueColors[accent]}`}>
            {value}
          </p>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>
        {Icon && (
          <span
            className={`flex shrink-0 w-12 h-12 items-center justify-center rounded-xl ${accentColors[accent]}`}
          >
            <Icon className="w-6 h-6" />
          </span>
        )}
      </div>
    </Card>
  );
}
