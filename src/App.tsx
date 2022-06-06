import './App.scss';
import logo from './assets/icons/logo.svg';
import { Calculator } from './components/Calculator';

function App() {
  return (
    <>
      <img className='logo' src={logo} alt='logo' />
      <Calculator />
    </>
  );
}

export default App;
