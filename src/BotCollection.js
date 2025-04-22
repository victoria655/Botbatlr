import React, { useState, useMemo } from 'react';
import SortBar from './SortBar';
import SidebarFilter from './SidebarFilter';
import BotCard from './BotCard';

function BotCollection({ bots, selectedBot, onSelect, onBack, onAddToArmy }) {
  const [sortKey, setSortKey] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedClasses, setAddedClasses] = useState([]);  // Track added bot classes

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleDeleteBot = (botId) => {
    fetch(`http://localhost:8001/bots/${botId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        // Update state or re-fetch the bot list if needed
        alert(`Bot ${botId} deleted successfully!`);
      })
      .catch((error) => {
        console.error('Error deleting bot:', error);
      });
  };

  const filteredBots = useMemo(() => {
    let result = bots;

    if (selectedClass) {
      result = result.filter((bot) => bot.bot_class === selectedClass);
    }

    if (searchQuery) {
      result = result.filter(
        (bot) =>
          bot.weapon?.toLowerCase().includes(searchQuery) ||
          bot.name?.toLowerCase().includes(searchQuery)
      );
    }

    return result;
  }, [bots, selectedClass, searchQuery]);

  const sortedBots = useMemo(() => {
    if (!sortKey) return filteredBots;
    return [...filteredBots].sort((a, b) => b[sortKey] - a[sortKey]);
  }, [filteredBots, sortKey]);

  const handleAddToArmy = (bot) => {
    if (addedClasses.includes(bot.bot_class)) {
      alert(`You can only add one bot from the ${bot.bot_class} class. Please choose a different class.`);
    } else {
      setAddedClasses((prevClasses) => [...prevClasses, bot.bot_class]); // Add class to the list
      onAddToArmy(bot);  // Call the original onAddToArmy function
    }
  };

  return (
    <div className="bot-collection-wrapper">
      <SidebarFilter selectedClass={selectedClass} onClassSelect={setSelectedClass} />
      <div className="main-content">
        <SortBar onSortChange={setSortKey} onSearchChange={handleSearchChange} />
        <BotCard
          bots={sortedBots}
          selectedBot={selectedBot}
          onSelect={onSelect}
          onBack={onBack}
          onAddToArmy={handleAddToArmy}  // Pass the modified add to army function
          onDelete={handleDeleteBot}
        />
      </div>
    </div>
  );
}

export default BotCollection;
