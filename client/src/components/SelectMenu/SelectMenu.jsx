import React from "react";
import styled from "styled-components"
import Icon from "../Icon";
import VisuallyHidden from '../VisuallyHidden';
import { COLORS, QUERIES, WEIGHTS } from "../../lib/constants";

const SelectMenu = ({ children, label, value, ...delegated }) => {
    const childArray = React.Children.toArray(children);
    const selectedChild = childArray.find(
        (child) => child.props.value === value
    );

    const displayedValue = selectedChild.props.children;

    return (
        <Wrapper>
            <VisuallyHidden>{label}</VisuallyHidden>
            <SelectWrapper>
                <NativeSelect {...delegated}>{children}</NativeSelect>
                <PresentationalSelect>{displayedValue}</PresentationalSelect>
                <IconWrapper icon="chevron-down" strokeWidth={1} size={24} />
            </SelectWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.label`
    width: fit-content;
`;

const SelectWrapper = styled.div`
    display: inline-block;
    position:relative;
`;
const NativeSelect = styled.select`
    opacity: 0;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    appearance: none;
    cursor: pointer;
`;
const PresentationalSelect = styled.div`
    background-color: white;
    color: ${COLORS.gray[900]};
    font-size: 1rem;
    padding: 12px 42px 12px 12px;
    border: none;
    border-radius: 8px;
    pointer-events: none;
`;
const IconWrapper = styled(Icon)`
    position: absolute;
    top: 0px;
    right: 8px;
    bottom: 0px;
    margin: auto;
    width:24px;
    aspect-ratio: 1;
    pointer-events:none;
`;

export default SelectMenu