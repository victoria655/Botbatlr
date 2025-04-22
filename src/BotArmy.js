import React from 'react';

function BotArmy({ army, onRemoveFromArmy }) {
  const handleDischarge = (botId) => {
    const confirmDischarge = window.confirm("Are you sure you want to discharge this bot from your army?");
    if (confirmDischarge) {
      onRemoveFromArmy(botId);
    }
  };

  return (
    <div className="bot-collection">
      {army.length === 0 ? (
        <p>Your army is empty. Go collect some bots!</p>
      ) : (
        army.map((bot) => (
          <div key={bot.id} className="bot-card">
            <button 
              className="remove-btn" 
              onClick={() => handleDischarge(bot.id)}
            >
              Discharge
            </button>
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

export default BotArmy;
