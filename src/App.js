import './App.css';
import Navbar from './components/Navbar';
import Chat from './container/Chat';
import stocksData from './assets/stock-data.json'

function App() {
  return (
    <section>
    <Navbar />
    <div className='chatContainer'>
      <Chat stocksData={stocksData} />
    </div>
    </section>
  );
}

export default App;
