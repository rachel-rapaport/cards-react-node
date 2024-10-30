import React from 'react';
import './ColorPicker.css';

const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

function ColorPicker({onColorSelect }) {
    return (
        <div className="color-picker">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => onColorSelect(color)}
                ></div>
            ))}
        </div>
    );
}

export default ColorPicker;
