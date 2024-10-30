import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import ColorPicker from "./ColorPicker";
import "./CardList.css";

function CardList() {
  const [cards, setCards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCardText, setNewCardText] = useState("");
  const [newCardColor, setNewCardColor] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);

  //get cards when the page rander
  useEffect(() => {
    getCards();
  }, []);

  //get all cards
  const getCards = () => {
    axios
      .get("http://localhost:5000/cards")
      .then((response) => {
        setCards(response.data.cards);
        console.log(response.data.cards);
      })
      .catch((error) => {
        console.error(
          `Error fetching cards: ${error.response?.status} - ${error.response?.statusText}`
        );
      });
  };

  //update card
  const updateCard = (index, card) => {
    axios
      .put(`http://localhost:5000/cards/${card.id}`, card)
      .then((response) => {
        const updatedCards = [...cards];
        updatedCards[index] = card;
        setCards(updatedCards);
        console.log("Card updated successfully:", response.data);
      })
      .catch((error) => {
        console.error(
          `Error card not found: ${error.response?.status} - ${error.response?.statusText}`
        );
      });
  };

  //update color card, sent to update card function
  const updateCardColor = (index, card, newColor) => {
    const cardUpdate = {
      id: card.id,
      text: card.text,
      color: newColor,
    };
    updateCard(index, cardUpdate);
  };

  //update text card, sent to update card function
  const handleUpdateText = (index, newText) => {
    const card = { ...cards[index], text: newText };
    updateCard(index, card);
  };

  //delete card
  const deleteCard = (cardId) => {
    axios
      .delete(`http://localhost:5000/cards/${cardId}`)
      .then((response) => {
        const cardsDelete = cards.filter((card) => card.id != cardId);
        setCards(cardsDelete);
        console.log("Card deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error(
          `Error card not found: ${error.response?.status} - ${error.response?.statusText}`
        );
      });
  };

  //add card
  const addCard = (card) => {
    axios
      .post("http://localhost:5000/cards", card)
      .then((response) => {
        const newCard = response.data;
        setCards([...cards, newCard]);
        console.log("Card added successfully:", newCard);
        getCards();
      })
      .catch((error) => {
        console.error(
          `Error adding card: ${error.response?.status} - ${error.response?.statusText}`
        );
      });
  };

  //open the card add
  const handleAddClick = () => {
    setIsAdding(true);
    setShowColorPicker(true);
  };

  //saves and sends the addition details
  const handleSave = () => {
    const newCard = { text: newCardText, color: newCardColor };
    addCard(newCard);
    setNewCardText("");
    setNewCardColor("");
    setShowColorPicker(false);
    setIsAdding(false);
  };

  //close add book card
  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <Card
          key={index}
          text={card.text}
          color={card.color}
          onChangeColor={(newColor) => updateCardColor(index, card, newColor)}
          onClickDelete={() => deleteCard(card.id)}
          onUpdateText={(newText) => handleUpdateText(index, newText)}
        />
      ))}
      {isAdding ? (
        <div className="card add-card">
          <input
            type="text"
            placeholder="Enter card text"
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
          />
          {showColorPicker && (
            <ColorPicker
              onColorSelect={(color) => {
                setNewCardColor(color);
              }}
            />
          )}
          <div className="button-group">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="card add-card" onClick={handleAddClick}>
          <span>+</span>
        </div>
      )}
    </div>
  );
}

export default CardList;