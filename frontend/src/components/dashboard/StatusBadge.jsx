const statusConfig = {
  Waiting: {
    label: 'Pending',
    className:
      'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
  'In Progress': {
    label: 'In Progress',
    className:
      'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  },
  Completed: {
    label: 'Completed',
    className:
      'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  },
  Rejected: {
    label: 'Rejected',
    className:
      'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
  },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.Waiting;
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors duration-200 ${config.className}`}
    >
      {config.label}
    </span>
  );
}
