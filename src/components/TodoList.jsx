import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import todoStore from '../lib/todoStore'
import TodoListSection from './TodoListSection'
import Tags from './Tags'

function TodoList({ className }) {
    const [ store ] = useState(todoStore);
    return (
        <div className={className}>
            <header>
                <h1 className="title">Ratehub TODO Exercise</h1>
            </header>
            <TodoListSection heading="To do items" items={store.activeItems} store={store} addButton={store.filter === ''} forwardBtn />
            <TodoListSection heading="Items in progress" items={store.progressItems} store={store} forwardBtn />
            <TodoListSection heading="Completed items" items={store.completedItems} store={store} />
            <footer>
                <Tags store={store} />
            </footer>
        </div>
    )
}

export default styled(observer(TodoList))`
    background-color: #fff;
    padding: 20px;
    font-family: sans-serif;
    .title {
        color: #000;
    }
`
