import formatMoney from '../utils/formatMoney';
import { getMonthKey, formatMonthKey } from '../utils/monthKey';

export default function MonthlySummary({ transactions }) {
  const months = transactions.reduce((acc, t) => {
    const key = getMonthKey(t.date);
    if (!acc[key]) acc[key] = { income: 0, expenses: 0 };
    if (t.type === 'income') acc[key].income += t.amount;
    else acc[key].expenses += t.amount;
    return acc;
  }, {});

  const rows = Object.entries(months).sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <section className="card">
      <h2>Monthly summary</h2>
      {rows.length === 0 ? (
        <p className="empty">Monthly totals will appear after your first transaction.</p>
      ) : (
        <div className="table-wrap">
          <table className="monthly">
            <thead>
              <tr>
                <th>Month</th>
                <th>Income</th>
                <th>Expenses</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([key, m]) => {
                const net = m.income - m.expenses;
                return (
                  <tr key={key}>
                    <td>{formatMonthKey(key)}</td>
                    <td className="income">{formatMoney(m.income)}</td>
                    <td className="expense">{formatMoney(m.expenses)}</td>
                    <td className={net < 0 ? 'expense' : 'income'}>{formatMoney(net)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
