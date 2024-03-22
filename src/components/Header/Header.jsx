import { LoggedInNav } from './LoggedInNav';
import { LoggedOutNav } from './LoggedOutNav';
import './header.css';

export function Header({ loggedIn }) {
  return (
    <header>
      <h1 data-text='BlogScape'>BlogScape</h1>
      {loggedIn ? <LoggedInNav /> : <LoggedOutNav />}
    </header>
  );
}
