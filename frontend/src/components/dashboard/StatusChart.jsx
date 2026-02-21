import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const STATUS_COLORS = {
  Waiting: '#f59e0b',   // amber
  'In Progress': '#3b82f6', // blue
  Completed: '#10b981',  // emerald
};

/**
 * Donut/pie chart for appointment status breakdown.
 */
export default function StatusChart({ appointments }) {
  const statusCounts = appointments.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name: name === 'Waiting' ? 'Pending' : name,
    value,
    fill: STATUS_COLORS[name] || '#94a3b8',
  }));

  if (data.length === 0) {
    return (
      <div className="h-[220px] flex items-center justify-center text-slate-400 text-sm">
        No data yet
      </div>
    );
  }

  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={56}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
            }}
            formatter={(value) => [value, 'appointments']}
          />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            formatter={(value) => value}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
