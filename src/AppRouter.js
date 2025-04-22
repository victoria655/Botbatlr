import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import BotCollection from './BotCollection';
import BotArmy from './BotArmy';
import Home from './Home';

function AppRouter({ bots, selectedBot, onSelect, onBack, onAddToArmy, army, onRemoveFromArmy }) {
  const location = useLocation();
  const isCollectionPage = location.pathname === "/collection";

  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/collection">Bot Collection</Link>
        <Link to="/army">Your Army</Link>
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
                onSelect={onSelect}
                onBack={onBack}
                onAddToArmy={onAddToArmy}
              />
            }
          />
          <Route
            path="/army"
            element={<BotArmy army={army} onRemoveFromArmy={onRemoveFromArmy} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default AppRouter;
