import React from "react";
import TodoListItem from './TodoListItem'
import TodoButton from './TodoButton'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

function TodoListSection({className, heading, items, store, addButton, forwardBtn}) {
    return (
        <section className={className}>
            <h3>{heading}</h3>
            <ul className="items">
                {items.map(item => (
                    <TodoListItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        tags={item.tags}
                        onTagAdd={(tag) => store.addTag(tag, item.id)}
                        onTagDelete={(tag) => store.deleteTag(tag, item.id)}
                        onChange={(e) => store.setItemName(item.id, e.target.value)}
                        onForward={() => store.moveForward(item.id)}
                        onBackward={(e) => store.moveBackward(item.id)}
                        forwardBtn={forwardBtn}
                    />
                ))}
                {addButton &&
                    <li className="add-item">
                        <TodoButton onClick={store.addItem} btnType="add" />
                    </li>
                }
            </ul> 
        </section>
    );
}

export default styled(observer(TodoListSection))`
    background-color: #eee;
    padding: 10px;
    margin-bottom: 20px;
    h3 {
        font-weight: 400;
    }
    ul.items {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        align-items: flex-start;
    }
    li.add-item{
        display: flex;
        min-width: 300px;
        align-self: center;
        button {
            font-size: 40px;
        }
    }
`;
