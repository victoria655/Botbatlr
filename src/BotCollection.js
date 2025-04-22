import React, { useState, useMemo } from 'react';
import SortBar from './SortBar';
import SidebarFilter from './SidebarFilter';
import BotCard from './BotCard';

function BotCollection({ bots, selectedBot, onSelect, onBack, onAddToArmy }) {
  const [sortKey, setSortKey] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredBots = useMemo(() => {
    let result = bots;

    if (selectedClass) {
      result = result.filter(bot => bot.bot_class === selectedClass);
    }

    if (searchQuery) {
      result = result.filter(bot =>
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
          onAddToArmy={onAddToArmy}
        />
      </div>
    </div>
  );
}

export default BotCollection;
