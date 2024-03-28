import styled from "styled-components"
import { COLORS, WEIGHTS } from "../../lib/constants";
import { NavLink } from "react-router-dom";

const NavigationLink = ({ children, ...delegated }) => {
    const styles = ({ isActive, isPending }) => {
        return {
            color: isActive ? `--nav-colr:${COLORS.secondary}` : `--nav-colr:${COLORS.gray[900]}`,
        };
    }

    return (
        <Wrapper {...delegated} style={({ isActive, isPending }) => {
            return {
                color: isActive ? `${COLORS.secondary}` : `${COLORS.gray[900]}`,
            };
        }}>
            <MainText>{children}</MainText>
            <HoverText hidden-aria="true" > {children} </HoverText>
        </Wrapper>
    )
}

// try to use navLink of react-router-dom
const Wrapper = styled(NavLink)`
    display: block;
    position: relative;
    text-decoration: none;
    font-size: ${18 / 16}rem;
    font-weight: ${WEIGHTS.normal};
    text-transform: uppercase;
    cursor: pointer;
    padding-inline: 20px;
    /* 
        text slide in animation
    */
    overflow: hidden;
`;

const Text = styled.span`
    display: block;
    transform: translateY(var(--transform-from));
    transition: transform 500ms ease-out;
    will-change: transform;
    ${Wrapper}:is(:hover, :focus) & {
        transform: translateY(var(--transform-to));
        transition: transform 250ms ease-in;
    }
    
    `;

const MainText = styled(Text)`
    --transform-from: 0%;
    --transform-to: -100%;
    `;
const HoverText = styled(Text)`
--transform-from: 100%;
--transform-to: 0%;
position: absolute;
top: 0;
bottom: 0;
width: 100%;
font-weight: ${WEIGHTS.bold};
`;

export default NavigationLink;