import React, { useState } from 'react';

const ActionCard = ({ actionName, formComponent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div onClick={handleCardClick}>
        <h3>{actionName}</h3>
      </div>
      {isExpanded && formComponent}
    </div>
  );
};

export default ActionCard;
