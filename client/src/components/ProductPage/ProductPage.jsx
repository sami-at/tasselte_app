import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { COLORS, QUERIES, WEIGHTS } from "../../lib/constants";
import MaxWidthWrapper from '../MaxWidthWrapper';
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductPage = () => {
    const [qty, setQty] = useState(1);
    const { t, i18n } = useTranslation();
    const { id } = useParams()
    const fetchProducts = async () => {
        try {
            const query = `${import.meta.env.VITE_BACKEND_URI}/products/${id}`
            const { data } = await axios.get(query);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProducts(),
    })

    if (isError) return <p>{error.message}</p>
    return isLoading ? <p>loading...</p> : (
        <Wrapper>
            <ImageWrapper>
                <Image src={data.product.image.src} alt={data.product.name} />
            </ImageWrapper>
            <Content>
                <Row>
                    <Name>{data.product.name}</Name>
                    <Price>{data.product.price + "DH"} </Price>
                </Row>
                <Description>{data.product.description}</Description>
                <Actions>
                    <Quantity>
                        <Decrement style={{ "--pointer": qty < 2 ? "none" : "" }}
                            onClick={() => setQty(prev => prev - 1)}
                        >-</Decrement>
                        <span>{qty}</span>
                        <span
                            onClick={() => setQty(prev => prev + 1)}
                        >+</span>
                    </Quantity>
                    <Order to={`https://wa.me/${import.meta.env.VITE_PHONE_NUMBER}`}>
                        {t('btn')}
                    </Order>
                </Actions>
            </Content>
        </Wrapper>
    )
}



const Wrapper = styled(MaxWidthWrapper)`
    padding: 40px 16px;
    display: flex;
    gap: 32px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    min-height: 80dvh;
    @media ${QUERIES.laptopAndUp} {
        flex-direction: row;
    }
`;
const ImageWrapper = styled.div`
    margin-bottom: 10px;
    overflow: hidden;
    flex: 1;
`;
const Image = styled.img`
    display: block;
    border-radius: 8px 8px 0 0;
    width: 100%;
    
`;
const Content = styled.article`
flex: 2;
padding-top: 30px;
display: grid;
gap: 20px;
@media ${QUERIES.laptopAndUp}{
    align-self: self-start;
}
`;
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    margin-bottom: 45px;
`;
const Name = styled.h2`
    font-size: ${25 / 16}rem;
    font-weight: ${WEIGHTS.bold};
`;
const Price = styled.p`
    font-weight: ${WEIGHTS.bold};
    color: ${COLORS.primary};
`;
const Description = styled.p`
    text-align: end;
    font-size: ${20 / 16}rem;
`;
const Actions = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
`;
const Quantity = styled.article`
    padding: 6px 24px;
    font-size: ${20 / 18}rem;
    font-weight: ${WEIGHTS.medium};
    text-transform: uppercase;
    background-color: #f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
    & span {
        cursor: pointer;
        width: 40px;
        font-size:${30 / 16}rem;
        font-weight: ${WEIGHTS.medium};
    }
`;
const Decrement = styled.span`
    pointer-events: var(--pointer);
`;
const Order = styled(Link)`
    padding: 10px 45px;
    background-color: green;
    color: ${COLORS.white};
    text-decoration: none;
    font-size: ${20 / 16}rem;
    font-weight: ${WEIGHTS.normal};
    text-transform: uppercase;
    border-radius:8px;
    transition: background 400ms ease-in-out;
    
    &:hover {
        background-color: hsl(127.79deg 52.19% 58.78%);
        transition: background 200ms ease-in-out;
    }

`;

export default ProductPage