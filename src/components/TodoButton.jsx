import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: transparent;
    color: ${({btnType}) => {
        switch(btnType){
            case 'done':
                return '#4f923a';
            case 'delete-tag':
            case 'delete-item':
                return '#f44336';
            case 'add':
                return '#000';
        }
    }};
    border: none;
    font-weight: 700;
    font-size: ${({btnType}) => {
        switch(btnType){
            case 'done':
                return '20px';
            case 'delete-tag':
                return '16px';
            case 'delete-item':
                return '24px';
            case 'add':
                return '24px';
        }
    }};
`;

export default function TodoButton({ onClick, btnType }) {
    let btnText = '';
    switch(btnType){
        case 'done':
            btnText = '✔';
            break;
        case 'delete-tag':
        case 'delete-item':
            btnText = 'x';
            break;
        case 'add':
            btnText = '+';
            break;
    }
    return <StyledButton onClick={onClick} btnType={btnType}>{btnText}</StyledButton>
}
