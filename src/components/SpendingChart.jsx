import formatMoney from '../utils/formatMoney';

export default function SpendingChart({ transactions }) {
  const totals = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const rows = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const max = rows.length > 0 ? rows[0][1] : 0;

  return (
    <section className="card">
      <h2>Spending by category</h2>
      {rows.length === 0 ? (
        <p className="empty">Add an expense to see where your money goes.</p>
      ) : (
        <ul className="chart">
          {rows.map(([category, total]) => (
            <li key={category} className="chart-row">
              <span className="chart-label">{category}</span>
              <div className="chart-track">
                <div
                  className="chart-bar"
                  style={{ width: `${(total / max) * 100}%` }}
                />
              </div>
              <span className="chart-value">{formatMoney(total)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
