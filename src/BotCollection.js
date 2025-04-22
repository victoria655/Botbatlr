import React, { useState, useMemo } from 'react';
import SortBar from './SortBar';
import SidebarFilter from './SidebarFilter';
import BotCard from './BotCard';


function BotCollection({ bots, selectedBot, onSelect, onBack, onAddToArmy }) {
  const [sortKey, setSortKey] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  const filteredBots = useMemo(() => {
    return selectedClass ? bots.filter(bot => bot.bot_class === selectedClass) : bots;
  }, [bots, selectedClass]);

  const sortedBots = useMemo(() => {
    if (!sortKey) return filteredBots;
    return [...filteredBots].sort((a, b) => b[sortKey] - a[sortKey]);
  }, [filteredBots, sortKey]);

  return (
    <div className="bot-collection-wrapper">
      <SidebarFilter selectedClass={selectedClass} onClassSelect={setSelectedClass} />
      <div className="main-content">
        <SortBar onSortChange={setSortKey} />
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
