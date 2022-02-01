// import logo from './logo.svg';
import './App.css';

import RegistersTable from './screens/RegistersTable';

function App() {
  return (
    <div className="App" id='app'>
      <header className="App-header">
        <h3>Registros meteorológicos</h3>
        <RegistersTable></RegistersTable>
      </header>
    </div>
  );
}

export default App;
