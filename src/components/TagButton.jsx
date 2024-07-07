import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    color: ${({active}) => active ? '#fff' : 'grey'};
    border: 1px solid grey;
    padding: 5px;
    font-size: 14px;
    border-radius: 6px;
    background-color: ${({active}) => active ? 'grey' : '#fff'};
`;

export default function TagButton({ onClick, tag, active }) {
    return <StyledButton onClick={onClick} active={active}>{tag}</StyledButton>
}
