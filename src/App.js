import ListeRestos from './components/ListeRestos';
import MapView from './components/MapView';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex' }}>
          <ListeRestos />
          <MapView />
          <ListeRestos />
        </div>
      </header>
    </div>
  );
}

export default App;
