import { useState } from 'react';
import './App.css';
import { Dashboard } from './components/dashboard/Dashboard';
import { Header } from './components/layout/Header';
import type { View } from './components/layout/Header';
import { TransactionsPage } from './components/transactions/TransactionsPage';
import { useBudgets } from './hooks/useBudgets';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const [view, setView] = useState<View>('dashboard');
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { getBudget, setBudget, clearBudget } = useBudgets();

  return (
    <div className="app">
      <Header activeView={view} onChangeView={setView} />
      <main className="app__main">
        {view === 'dashboard' ? (
          <Dashboard
            transactions={transactions}
            getBudget={getBudget}
            setBudget={setBudget}
            clearBudget={clearBudget}
          />
        ) : (
          <TransactionsPage
            transactions={transactions}
            onAdd={addTransaction}
            onUpdate={updateTransaction}
            onDelete={deleteTransaction}
          />
        )}
      </main>
    </div>
  );
}

export default App;
