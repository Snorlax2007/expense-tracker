import TransactionItem from './TransactionItem';

export default function TransactionList({ transactions, hasAny, onDelete }) {
  if (transactions.length === 0) {
    return (
      <p className="empty">
        {hasAny
          ? 'No transactions match this filter. Try another category.'
          : 'No transactions yet. Add your first one using the form.'}
      </p>
    );
  }

  return (
    <ul className="list">
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
      ))}
    </ul>
  );
}
