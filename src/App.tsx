import { FC } from 'react';
import logo from './logo.svg';
import './App.css';

const App: FC = () => {
  return (
    <div className="blog">
      <header id="top">
        <img src={logo} className="logo" alt="graced.is" />
        {/* <nav>
          <ul>
            <li>blog</li>
            <li>about</li>
            <li>code</li>
            <li>exits</li>
          </ul>
        </nav> */}
      </header>
    </div>
  );
}

export default App;
