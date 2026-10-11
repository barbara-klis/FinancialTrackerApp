export type View = 'dashboard' | 'transactions';

interface HeaderProps {
  activeView: View;
  onChangeView: (view: View) => void;
}

export function Header({ activeView, onChangeView }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header__title">Budget Tracker</h1>
      <nav className="header__nav">
        <button
          type="button"
          className={activeView === 'dashboard' ? 'tab tab--active' : 'tab'}
          onClick={() => onChangeView('dashboard')}
        >
          Dashboard
        </button>
        <button
          type="button"
          className={activeView === 'transactions' ? 'tab tab--active' : 'tab'}
          onClick={() => onChangeView('transactions')}
        >
          Transactions
        </button>
      </nav>
    </header>
  );
}
