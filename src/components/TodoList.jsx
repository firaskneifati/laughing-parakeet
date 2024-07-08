import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import TodoButton from './TodoButton'
import todoStore from '../lib/todoStore'
import TodoListItem from './TodoListItem'
import TagButton from './TagButton'

function TodoList({ className }) {
    const [ store ] = useState(todoStore);
    const toggleFilter = (tag) => {
        if( '' === store.filter || tag !== store.filter ) {
            store.setFilter(tag);
        } else {
            store.setFilter('');
        }
    }
    return (
        <div className={className}>
            <header>
                <h1 className="title">Ratehub TODO Exercise</h1>
            </header>
            <section>
                <h3>To do items</h3>
                <ul className="items">
                    {store.activeItems.map(item => (
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
                            forwardBtn
                        />
                    ))}
                    {store.filter === '' &&
                        <li className="add-item">
                            <TodoButton onClick={store.addItem} btnType="add" />
                        </li>
                    }
                </ul> 
            </section>
            <section>
                <h3>Items in progress</h3>
                <ul className="items">
                    {store.progressItems.map(item => (
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
                            forwardBtn
                        />
                    ))}
                </ul>
            </section>
            <section>
                <h3>Completed items</h3>
                <ul className="items">
                    {store.completedItems.map(item => (
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
                        />
                    ))}
                </ul>
            </section>
            <footer>
                <h3>Tags</h3>
                <ul className="tags">
                    {store.tags.map(tag => (
                        <li key={tag}>
                            <TagButton onClick={() => toggleFilter(tag)} tag={tag} active={tag === store.filter} />
                        </li>
                    ))}
                </ul>
            </footer>
        </div>
    )
}

export default styled(observer(TodoList))`
    background-color: #fff;
    padding: 20px;
    font-family: sans-serif;

    section{
        background-color: #eee;
        padding: 10px;
        margin-bottom: 20px;
    }
    .title {
        color: #000;
    }
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
    ul.tags {
        list-style-type: none;
        margin: 0;
        padding: 0;
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
`
