import formatMoney from '../utils/formatMoney';

export default function BalanceSummary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  return (
    <section className="summary" aria-label="Balance summary">
      <div className="summary-balance">
        <span className="summary-label">Balance</span>
        <span className={`summary-amount ${balance < 0 ? 'negative' : ''}`}>
          {formatMoney(balance)}
        </span>
      </div>
      <div className="summary-split">
        <div>
          <span className="summary-label">Income</span>
          <span className="income">{formatMoney(income)}</span>
        </div>
        <div>
          <span className="summary-label">Expenses</span>
          <span className="expense">{formatMoney(expenses)}</span>
        </div>
      </div>
    </section>
  );
}
