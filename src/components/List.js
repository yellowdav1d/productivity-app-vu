import React from 'react';
import Item from "./Item";

function List({ list, IsDone}) {
    return (
        <div className="list">
            {list.map(({ id, text, isDone }) => <Item key={id} id={id} text={text} isDone={isDone} IsDone={IsDone}/>)}
        </div>
    )
}

export default List;
