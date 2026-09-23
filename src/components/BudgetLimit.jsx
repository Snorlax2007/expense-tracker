import formatMoney from '../utils/formatMoney';

export default function BudgetLimit({ budget, spent, onBudgetChange }) {
  const hasBudget = budget > 0;
  const overBudget = hasBudget && spent > budget;
  const percent = hasBudget ? Math.min((spent / budget) * 100, 100) : 0;

  return (
    <section className="card budget">
      <h2>Monthly budget</h2>

      <label>
        Limit (Rs.)
        <input
          type="number"
          min="0"
          step="any"
          value={budget || ''}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          placeholder="Set a monthly limit"
        />
      </label>

      {hasBudget && (
        <>
          <div className="budget-track">
            <div
              className={`budget-fill ${overBudget ? 'over' : ''}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="budget-text">
            {formatMoney(spent)} spent of {formatMoney(budget)} this month
          </p>
        </>
      )}

      {overBudget && (
        <p className="budget-warning" role="alert">
          You are {formatMoney(spent - budget)} over your budget this month.
        </p>
      )}
    </section>
  );
}
