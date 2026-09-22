import { useState } from 'react';

export default function TransactionForm({ categories, onAdd }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = Number(amount);

    if (!value || value <= 0) {
      setError('Enter an amount greater than 0.');
      return;
    }
    if (!description.trim()) {
      setError('Add a short description.');
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      type,
      amount: value,
      category,
      description: description.trim(),
      date: new Date().toISOString(),
    });

    setAmount('');
    setDescription('');
    setError('');
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>New transaction</h2>

      <div className="type-toggle" role="group" aria-label="Transaction type">
        <button
          type="button"
          className={type === 'expense' ? 'active expense-btn' : ''}
          onClick={() => setType('expense')}
        >
          Expense
        </button>
        <button
          type="button"
          className={type === 'income' ? 'active income-btn' : ''}
          onClick={() => setType('income')}
        >
          Income
        </button>
      </div>

      <label>
        Amount (Rs.)
        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
        />
      </label>

      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Lunch at canteen"
        />
      </label>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" className="primary">
        Add transaction
      </button>
    </form>
  );
}
