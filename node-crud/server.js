const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const cards = [
  { id: 1, text: "First Title", color: "#FF5733" },
  { id: 2, text: "Second Title", color: "#33C1FF" },
  { id: 3, text: "Third Title", color: "#33FF57" },
];

//CRUD-READ
app.get("/cards", (req, res) => {
  res
    .status(200)
    .json({ message: "cards retrieved successfully", cards: cards });
});

// CRUD-READ BY ID
app.get("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find((card) => card.id === cardId);
  if (card) {
    res
      .status(200)
      .json({ message: "card retrieved successfully", card: card });
  } else {
    res.status(404).json({ message: "card not found" });
  }
});

//CRUD-CREATE
app.post("/cards", (req, res) => {
  const newCard = {
    id: cards.length + 1,
    text: req.body.text,
    color: req.body.color,
  };
  cards.push(newCard);
  res.status(201).json({ message: "card created successfully", card: newCard });
});

//CRUD-UPDATE
app.put("/cards/update/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const cardIndex = cards.findIndex((card) => card.id == cardId);
  if (cardIndex != -1) {
    const updateCard = {
      id: cardId,
      text: req.body.text || cards[cardIndex].text,
      color: req.body.color || cards[cardIndex].color,
    };
    cards[cardIndex] = updateCard;
    res
      .status(200)
      .json({ message: "card updated successfully", card: updateCard });
  } else {
    res.status(404).json({ message: "card not found" });
  }
});

//CRUD-DELETE
app.delete("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const cardIndex = cards.findIndex((card) => card.id == cardId);
  if (cardIndex != -1) {
    const deleteCard = cards.splice(cardIndex, 1);
    res
      .status(200)
      .json({ message: "card deleted successfully", card: deleteCard[0] });
  } else {
    res.status(404).json({ message: "card not found" });
  }
});

//update orders cards
app.put("/cards/reorder", (req, res) => {
  const { fromIndex, toIndex } = req.body;
  if (fromIndex === undefined || toIndex === undefined) {
    return res.status(400).json({ message: "Invalid indices" });
  }
  if (
    fromIndex < 0 ||
    fromIndex >= cards.length ||
    toIndex < 0 ||
    toIndex >= cards.length
  ) {
    return res.status(400).json({ message: "Index out of bounds" });
  }
  const moveCard = cards[fromIndex];
  cards.splice(fromIndex, 1);
  cards.splice(toIndex, 0, moveCard);
  return res.status(200).json({ message: "Order updated successfully", cards });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
