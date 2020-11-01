import React from 'react';
import { FaCheck } from "react-icons/fa";

function Item({ id, text, isDone, IsDone }) {
    return (
        <div className={"item " + (isDone === true ? "item-done" : "")}>
            <p>{text}</p>
            <button onClick={() => IsDone(id)}><FaCheck /></button>
        </div>
    )
}

export default Item;
