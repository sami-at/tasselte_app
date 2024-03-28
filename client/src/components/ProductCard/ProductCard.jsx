import { Link } from "react-router-dom"
import styled from "styled-components"
import { COLORS, WEIGHTS } from "../../lib/constants"

const ProductCard = ({ id, image, name, price, description, children }) => {
    return (
        <CardLink to={`product/${id}`}>
            <Wrapper>
                <ImageWrapper>
                    <Image src={image} alt={name} />
                </ImageWrapper>
                <Row>
                    <Name>{name}</Name>
                    <p>{description.slice(0, 80)}</p>
                    <Price>{price + " DH"}</Price>
                    {children}
                </Row>
            </Wrapper>
        </CardLink>
    )
}

const CardLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    border-radius: 8px;
    text-align: end;
`;
const Wrapper = styled.article`
    border-radius: 8px;
    padding: 16px 32px;
    display: flex;
    flex-direction: row-reverse;
    gap: 30px;
    background-color: hsl(32deg 78.95% 96.27%);
`;
const ImageWrapper = styled.div`
    margin-bottom: 10px;
    overflow: hidden;
`;
const Image = styled.img`
    display: block;
    border-radius: 8px 8px 0 0;
    width: 100%;
    will-change: transform;
    filter: brightness(80%);
    transition: transform 500ms ease-out, filter 450ms ease-out;
    transform-origin: 50% 75%;
    @media (prefers-reduced-motion: no-preference){
        ${CardLink}:hover & {
            transform: scale(1.1);
            filter: brightness(100%);
            transition: transform 250ms ease-in;
        }
    }
`;
const Row = styled.div`
    display: flex;
    flex-direction: column;
    text-align: end;
    gap: 20px;
    padding-block: 20px;
    font-size:${18 / 16}rem;
    font-weight: ${WEIGHTS.normal};
    & p {
        line-height:1.7;
    }
`;
const Name = styled.h2`
    font-size: ${25 / 16}rem;
    font-weight: ${WEIGHTS.bold};
`;
const Price = styled.p`
    font-weight: ${WEIGHTS.medium};
    color: ${COLORS.black};
`;

export default ProductCard