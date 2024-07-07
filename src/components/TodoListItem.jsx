import React, {useRef, useEffect, useState} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import TodoButton from './TodoButton'
import { motion } from 'framer-motion'

function TodoListItem({ id, className, name, tags, onTagAdd, onTagDelete, onChange, onForward, onBackward }) {

    const tagInput = useRef();
    const onTagAddHandler = () => {
        onTagAdd(tagInput.current.value);
    }

    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [name]);

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleTagSection = () => {
        if(isExpanded) {
            setIsExpanded(false)
        } else {
            setIsExpanded(true);
        }
    }

    return (
        <motion.li className={className}
            layoutId={id}
        >
            <div className="col-1">
                <textarea onChange={onChange} value={name} ref={textareaRef}/>
                <section className={`tags-section ${ isExpanded ? 'expanded' : ''}`}>
                    <button className="tags-expand-btn" onClick={toggleTagSection}>tags <span>&#9650;</span></button>    
                    <motion.div style={{overflow: 'hidden'}}
                        initial="hidden"
                        animate={isExpanded ? 'visible' : 'hidden'}
                        variants={{
                            hidden: {height: 0},
                            visible: {height: "auto", transition: { duration: 0.5 }},
                        }}
                    >        
                        <div className="add-tag">
                            <label htmlFor="tag-input">Add tag</label>
                            <input id="tag-input" ref={tagInput} maxLength={12}/>
                            <TodoButton btnType="add" onClick={onTagAddHandler}/>
                        </div>
                        <ul className="tags">
                            {tags && tags.map(tag => (
                                <li key={tag}>
                                    {tag}<TodoButton onClick={() => onTagDelete(tag)} btnType="delete-tag" />
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </section>
            </div>
            <div className="col-2">
                <TodoButton onClick={onForward} btnType="done" />
                <TodoButton onClick={onBackward} btnType="delete-item" />
            </div>
        </motion.li>
    )
}

export default styled(observer(TodoListItem))`
    margin-bottom: 10px;
    border: 1px solid grey;
    display: flex;
    width: 300px;
    
    .col-1 {
        width: calc(100% - 40px);
        border-right: 1px solid black;
        padding: 10px;
        box-sizing: content-box;
    }

    .col-2 {
        width: 40px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        align-content: center;
        button {
            display: block;
            width: 100%;
        }
    }

    textarea {
        width: 100%;
        font-size: 16px;
        box-sizing: border-box;
        padding: 5px;
        font-family: sans-serif;
        overflow: hidden;
    }

    .add-tag{
        margin: 10px 0;
        input {
            margin-left: 10px;
            width: 110px;
            font-size: 14px;
        }
        button {
            position: relative;
            top: 4px;
        }
    }

    .tags {
        li{
            border: 1px solid grey;
            color: grey;
            padding: 3px;
            font-size: 14px;
            border-radius: 6px;
        }
    }

    .tags-expand-btn {
        background-color: transparent;
        border: none;
        span {
            display: inline-block;
            transition: transform 0.5s ease-out;
        }
    }

    .tags-section.expanded {
        .tags-expand-btn span {
            transform: rotate(180deg);
        }
    }
`
