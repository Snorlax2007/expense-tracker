import formatMoney from '../utils/formatMoney';

export default function TransactionItem({ transaction, onDelete }) {
  const { id, type, amount, category, description, date } = transaction;
  const sign = type === 'income' ? '+' : '-';

  return (
    <li className={`item ${type}`}>
      <div className="item-main">
        <span className="item-desc">{description}</span>
        <span className="item-meta">
          {category}, {new Date(date).toLocaleDateString()}
        </span>
      </div>
      <span className={`item-amount ${type === 'income' ? 'income' : 'expense'}`}>
        {sign}
        {formatMoney(amount)}
      </span>
      <button
        type="button"
        className="delete"
        onClick={() => onDelete(id)}
        aria-label={`Delete ${description}`}
      >
        Delete
      </button>
    </li>
  );
}
