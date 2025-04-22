import React from 'react';

function BotCard({ bots, selectedBot, onSelect, onBack, onAddToArmy }) {
  return (
    <div className="bot-collection">
      {selectedBot ? (
        <div className="bot-card focused">
          <img src={selectedBot.avatar_url} alt={selectedBot.name} />
          <h3>{selectedBot.name}</h3>
          <p>{selectedBot.catchphrase}</p>
          <p>Class: {selectedBot.bot_class}</p>
          <p>Health: {selectedBot.health} | Damage: {selectedBot.damage} | Armor: {selectedBot.armor}</p>
          <div className="btn-group">
            <button onClick={onAddToArmy}>Add to Army</button>
            <button onClick={onBack}>Back</button>
          </div>
        </div>
      ) : (
        bots.map((bot) => (
          <div key={bot.id} className="bot-card" onClick={() => onSelect(bot)}>
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>{bot.name}</h3>
            <p>{bot.catchphrase}</p>
            <p>Class: {bot.bot_class}</p>
            <p>Health: {bot.health} | Damage: {bot.damage} | Armor: {bot.armor}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BotCard;
