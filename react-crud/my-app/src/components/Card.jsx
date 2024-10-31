import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import "./Card.css";

function Card({ text, color, onChangeColor, onClickDelete, onUpdateText }) {
  const [showColor, setShowColor] = useState(false);
  const [showDelete, setShowDelete] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  //opens or closes colorPicker
  const handleColorClick = () => {
    setShowColor(!showColor);
    setShowDelete(!showDelete);
  };

  //sends the selected color
  const handleColorSelect = (selectedColor) => {
    onChangeColor(selectedColor);
    setShowColor(false);
    setShowDelete(true);
  };

  //open input-text
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  //change text
  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  //sends the change text
  const handleSave = () => {
    onUpdateText(editedText); 
    setIsEditing(false);
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: color}}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={handleTextChange}
            onBlur={handleSave} // saves if clicked outside the text box
          />
          <button className="save-button" onClick={handleSave}>
            ✔️
          </button>
        </>
      ) : (
        <h3 className="card-title" onDoubleClick={handleDoubleClick}>
          {text}
        </h3>
      )}

      <div className="color-circle" onClick={handleColorClick}></div>
      
      {showDelete && (
        <button className="delete-button" onClick={() => onClickDelete()}>
          🗑️
        </button>
      )}
      {showColor && <ColorPicker onColorSelect={handleColorSelect} />}
    </div>
  );
}

export default Card;
