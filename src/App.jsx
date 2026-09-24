import { useState } from 'react';
import Header from './components/Header';
import BalanceSummary from './components/BalanceSummary';
import BudgetLimit from './components/BudgetLimit';
import TransactionForm from './components/TransactionForm';
import FilterBar from './components/FilterBar';
import TransactionList from './components/TransactionList';
import SpendingChart from './components/SpendingChart';
import MonthlySummary from './components/MonthlySummary';
import useLocalStorage from './hooks/useLocalStorage';
import { getMonthKey } from './utils/monthKey';
import { CATEGORIES } from './constants';

const sorters = {
  'date-desc': (a, b) => new Date(b.date) - new Date(a.date),
  'date-asc': (a, b) => new Date(a.date) - new Date(b.date),
  'amount-desc': (a, b) => b.amount - a.amount,
  'amount-asc': (a, b) => a.amount - b.amount,
};

export default function App() {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [budget, setBudget] = useLocalStorage('budget', 0);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('date-desc');

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const visibleTransactions = transactions
    .filter((t) => category === 'All' || t.category === category)
    .sort(sorters[sort]);

  const currentMonth = getMonthKey(new Date().toISOString());
  const spentThisMonth = transactions
    .filter((t) => t.type === 'expense' && getMonthKey(t.date) === currentMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="app">
      <Header />
      <BalanceSummary transactions={transactions} />

      <main className="layout">
        <div className="column">
          <TransactionForm categories={CATEGORIES} onAdd={addTransaction} />
          <BudgetLimit budget={budget} spent={spentThisMonth} onBudgetChange={setBudget} />
        </div>

        <div className="column">
          <section className="card">
            <h2>Transactions</h2>
            <FilterBar
              categories={CATEGORIES}
              category={category}
              sort={sort}
              onCategoryChange={setCategory}
              onSortChange={setSort}
            />
            <TransactionList
              transactions={visibleTransactions}
              hasAny={transactions.length > 0}
              onDelete={deleteTransaction}
            />
          </section>

          <SpendingChart transactions={transactions} />
          <MonthlySummary transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
