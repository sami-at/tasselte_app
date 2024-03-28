import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/images/LOGO-TASSELTE2.png'

const Logo = ({ src, ...delegated }) => {
    return (
        <Wrapper {...delegated}>
            <Image src={logo} alt="logo image" />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: block;
    position: relative;
    width: fit-content;
    max-height: 70px;
    /* margin-inline-end: auto; */

`;

const Image = styled.img`
    display: block;
    width: 100px;
    height: 100px;
    object-fit: cover;
    /* position: absolute; */
`;
export default Logo