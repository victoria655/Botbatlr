import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import BotCollection from './BotCollection';
import BotArmy from './BotArmy';
import Home from './Home';
import './App.css';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null); // Fixed the initial state to null, as it should be an object
  const [army, setArmy] = useState(() => {
    const savedArmy = localStorage.getItem('botArmy');
    return savedArmy ? JSON.parse(savedArmy) : [];
  });

  const location = useLocation();
  const isCollectionPage = location.pathname === '/collection';

  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then((res) => res.json())
      .then((data) => setBots(data));
  }, []);

  const handleSelect = (bot) => setSelectedBot(bot);
  const handleBack = () => setSelectedBot(null);

  const handleAddToArmy = () => {
    if (!selectedBot) return;
    const isAlreadyAdded = army.some((b) => b.id === selectedBot.id);
    if (isAlreadyAdded) {
      alert(`${selectedBot.name} has already been added to your army.`);
    } else {
      const updatedArmy = [...army, selectedBot];
      setArmy(updatedArmy);
      localStorage.setItem('botArmy', JSON.stringify(updatedArmy));
      alert(`${selectedBot.name} added to your army!`);
    }
    setSelectedBot(null);
  };

  const handleRemoveFromArmy = (botId) => {
    const updatedArmy = army.filter((b) => b.id !== botId);
    setArmy(updatedArmy);
    localStorage.setItem('botArmy', JSON.stringify(updatedArmy));
    alert('Bot discharged from your army.');
  };

  const handleDeleteBot = (botId) => {
    fetch(`http://localhost:8001/bots/${botId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        // Re-fetch the bot list after deletion
        setBots((prevBots) => prevBots.filter((bot) => bot.id !== botId));
        alert('Bot has been deleted successfully.');
      })
      .catch((error) => {
        console.error('Error deleting bot:', error);
      });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo.jpg" alt="Bot Battlr Logo" className="logo" />
          <span className="title">Bot Battlr</span>
        </div>
        <div className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/collection">Bot Collection</Link>
          <Link to="/army">Your Army</Link>
        </div>
      </nav>

      <div className={`App ${selectedBot && isCollectionPage ? 'blurred' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/collection"
            element={
              <BotCollection
                bots={bots}
                selectedBot={selectedBot}
                onSelect={handleSelect}
                onBack={handleBack}
                onAddToArmy={handleAddToArmy}
                onDelete={handleDeleteBot} // Pass the delete functionality to BotCollection
              />
            }
          />
          <Route
            path="/army"
            element={<BotArmy army={army} onRemoveFromArmy={handleRemoveFromArmy} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
