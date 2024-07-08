import React from "react"
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import TagButton from './TagButton'

function Tags({className, store}) {
    const toggleFilter = (tag) => {
        if( '' === store.filter || tag !== store.filter ) {
            store.setFilter(tag);
        } else {
            store.setFilter('');
        }
    }
    
    return (
        <div className={className}>
            <h3>Tags</h3>
            <ul className="tags">
                {store.tags.map(tag => (
                    <li key={tag}>
                        <TagButton onClick={() => toggleFilter(tag)} tag={tag} active={tag === store.filter} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default styled(observer(Tags))`
    h3 {
        font-weight: 400;
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
`;
