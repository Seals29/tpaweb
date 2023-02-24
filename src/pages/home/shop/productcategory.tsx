import React, { useState } from 'react';

function SelectComponent() {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <div>
            <label htmlFor="selectOption">Choose an option:</label>
            <select id="selectOption" value={selectedOption} onChange={(e) => {
                setSelectedOption(e.target.value)
            }}>
                <option value="">--Please choose an option--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <p>You selected: {selectedOption}</p>
        </div>
    );
}

export default SelectComponent;
