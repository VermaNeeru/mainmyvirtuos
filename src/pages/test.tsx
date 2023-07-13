import React, { useState } from 'react';

export default function ListAppender() {
    const [listItems, setListItems] = useState(['1']);

    const appendItem = () => {
        const newItem = `${listItems.length + 1}`;
        setListItems([...listItems, newItem]);
    };

    const removeItem = (index: number) => {
        const updatedList = listItems.filter((item, i) => i !== index);
        setListItems(updatedList);
    };

    return (
        <div>
            <ul>
                {listItems.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={appendItem}>Add Item</button>
        </div>
    );
}
