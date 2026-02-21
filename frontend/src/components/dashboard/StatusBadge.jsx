const statusConfig = {
  Waiting: { label: 'Pending', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  'In Progress': { label: 'In Progress', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  Completed: { label: 'Completed', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  Rejected: { label: 'Rejected', className: 'bg-red-50 text-red-700 border-red-200' },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.Waiting;
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors duration-200 ${config.className}`}
    >
      {config.label}
    </span>
  );
}
