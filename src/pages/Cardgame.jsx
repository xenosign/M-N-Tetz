import React, { useState } from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from './components/Card';

const style = {
  display: 'grid',
  gridTemplateColumns: '200px 200px 200px',
  width: 600,
};

let cardArr = [];
for (let i = 1; i < 20; i++) {
  cardArr.push({ id: i, text: `Card ${i}` });
}

const CardGame = () => {
  const [cards, setCards] = useState(cardArr);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    setCards(
      update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={style}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default CardGame;
