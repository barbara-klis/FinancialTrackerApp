import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryTotal } from '../../utils/calculations';
import { formatCurrency } from '../../utils/format';

interface CategoryChartProps {
  data: CategoryTotal[];
}

// Fixed categorical order (never reassigned per-render) so a category keeps
// the same color across sessions regardless of amount/rank.
const CATEGORY_COLORS: Record<string, string> = {
  Food: '#2a78d6',
  Rent: '#eb6834',
  Transport: '#1baf7a',
  Entertainment: '#eda100',
  Utilities: '#e87ba4',
  Health: '#008300',
  Shopping: '#4a3aa7',
  Other: '#e34948',
};
const FALLBACK_COLOR = '#898781';

function colorFor(category: string): string {
  return CATEGORY_COLORS[category] ?? FALLBACK_COLOR;
}

export function CategoryChart({ data }: CategoryChartProps) {
  if (data.length === 0) {
    return (
      <div className="chart-card">
        <h2 className="chart-card__title">Spending by Category</h2>
        <p className="chart-card__empty">No expenses yet — add one to see the breakdown.</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h2 className="chart-card__title">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell key={entry.category} fill={colorFor(entry.category)} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
